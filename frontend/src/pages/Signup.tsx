import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import type { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

interface SignupForm {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
  role: string;
  mrf_id?: string;
}

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
  const navigate = useNavigate();
  const password = watch('password');

  const mutation = useMutation({
    mutationFn: (formData: SignupForm) => {
      const { confirm_password, ...data } = formData;
      return api.post('/api/v1/auth/register', data);
    },
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });

  const onSubmit = (formData: SignupForm) => {
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Scenic image and welcome */}
      <div className="hidden md:flex md:w-1/2 relative bg-primary-900">
        <img
          src="/images/waste-management.jpg"
          alt="Scenic Waste Management"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center items-center h-full w-full bg-black/40 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">MRF DigiTrack</h1>
          <p className="text-lg text-white/90 max-w-md text-center mb-8 drop-shadow">
            Join MRF DigiTrack to manage waste operations efficiently and make a positive impact!
          </p>
        </div>
      </div>

      {/* Right: Signup form */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold mb-2 text-center text-primary-700">Register Now!</h2>
          <p className="text-center text-gray-500 mb-4">Create your account to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="input"
                {...register('full_name', { 
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="input"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="input"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="input"
                {...register('confirm_password', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === password || 'Passwords do not match'
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Role</label>
              <select
                className="input"
                {...register('role', { required: 'Role is required' })}
              >
                <option value="">Select a role</option>
                <option value="operator">Operator</option>
                <option value="manager">Manager</option>
                <option value="panchayat">Panchayat</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">MRF ID (Optional)</label>
              <input
                type="text"
                className="input"
                {...register('mrf_id')}
                placeholder="Enter your MRF ID if you have one"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating account...' : 'Create account'}
            </button>

            {mutation.isError && (
              <div className="mb-2 text-red-600">Registration failed. Please check your details.</div>
            )}
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 