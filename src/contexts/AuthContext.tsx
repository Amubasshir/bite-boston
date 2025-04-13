import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    is_harvard_grad?: boolean
  ) => Promise<boolean>;  // Updated parameter list and return type
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  hasChooseUV: boolean;
  setHasChooseUV: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasChooseUV, setHasChooseUV] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on mount
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        toast.error('Session error. Please log in again.');
      }

      setSession(data.session);
      setUser(data.session?.user || null);
      setIsLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsLoading(false);
      }
    );

    const hasChooseUVResult = JSON.parse(localStorage.getItem('hasChooseUV'));
    if(hasChooseUVResult) {
        setHasChooseUV(true);
    }else{
        setHasChooseUV(false);
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    is_harvard_grad: boolean
  ) => {
    setIsLoading(true);
  
    try {
      // First, create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            is_harvard_grad: Boolean(is_harvard_grad), // Ensure boolean conversion
            phone: phone,
          },
        },
      });

      if (error) {
        // Check for specific error messages
        if (error.message.includes('email')) {
          toast.error('This email is already in use. Please try logging in instead.');
        
        } else if (error.message.includes('phone')) {
          toast.error('This phone number is already registered with another account.');
        } else {
          toast.error(error.message);
        }
        return false;
      }
  
      // Check if email is already registered
      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        toast.error('This email is already registered. Please login instead.');
       
        return false;
      }
  
  
    } catch (error) {
   
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred during signup.');
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Incorrect password. Please try again.');
        } else {
          toast.error(error.message);
        }
        return false;
      }

      if (data.user) {
        toast.success('Logged in successfully!');
        return true
       
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred during login.');
      return false
    } finally {
      setIsLoading(false);

    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An unexpected error occurred during logout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        hasChooseUV,
        setHasChooseUV,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
