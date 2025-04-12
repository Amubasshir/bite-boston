import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { SignupFormValues, signupSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SignupPage() {
  const { signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      is_harvard_grad: false
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const isRedirect = await signUp(
        data.email,
        data.password,
        data.fullName,
        data.phone,
        data.is_harvard_grad // Ensure boolean conversion
      );
      // Redirect to Stripe payment page after successful signup
      if (isRedirect) {
        window.location.href = '/login';
        return;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred during signup.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent-purple/10 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full mx-4">
 
        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="fullName">
                👤 Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="email">
                📩 Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="phone">
                📱 Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="password">
                🔒 Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                🔒 Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="is_harvard_grad">
                🎓 Are you a Harvard graduate?
              </label>

              // Update the select options to use boolean values
              <select
                id="is_harvard_grad"
                className="w-full p-3 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors mt-1"
                {...register('is_harvard_grad', {
                  setValueAs: (value) => value === 'true'  // Convert string to boolean
                })}
              >
                <option value="">Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.is_harvard_grad && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.is_harvard_grad.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Notice */}
          {/* <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              💳 Complete Your Payment via Stripe: Only paid accounts will
              receive access to TasteTrail deals.
            </p>
            <p className="text-sm text-gray-600">
              ✅ Cancel anytime. No hidden fees. Just great food at great
              prices.
            </p>
          </div> */}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading
              ? 'Creating Account...'
              : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
