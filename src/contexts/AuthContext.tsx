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
    phone: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
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

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    setIsLoading(true);

    try {
      // First check if email already exists
      const { data: emailCheckData, error: emailCheckError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();

      if (emailCheckData) {
        toast.error('This email is already registered. Please login instead.');
        setIsLoading(false);
        return;
      }

      // Check if phone already exists
      const { data: phoneCheckData, error: phoneCheckError } = await supabase
        .from('profiles')
        .select('phone')
        .eq('phone', phone)
        .single();

      if (phoneCheckData) {
        toast.error('This phone number is already registered with another account.');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
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

      // Rest of the function remains the same
      if (data.user) {
        toast.success('Account created successfully!');

        // Sign in the user immediately after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          toast.error(
            'Account created but could not log in automatically. Please log in manually.'
          );
         
       
        }
        toast.success('Signup successfully!');
        return true;
       
      
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
      // First check if the user exists
      const { data: userExists, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (!userExists) {
        toast.error('No account found with this email. Please sign up first.');
        setIsLoading(false);
        return;
      }

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
        return;
      }

      if (data.user) {
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred during login.');
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
