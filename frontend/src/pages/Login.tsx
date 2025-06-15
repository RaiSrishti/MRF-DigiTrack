import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import type { AxiosResponse } from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: LoginForm) => api.post('/auth/login', formData),
    onSuccess: (res: AxiosResponse<{ token: string }>, variables: LoginForm) => {
      login(variables.email, variables.password);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const onSubmit = (formData: LoginForm) => {
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
            Welcome back! Log in to your account to access your dashboard, track sorting, preferences, and more.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-green-500 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold mb-2 text-center text-primary-700">Login Now!</h2>
          <p className="text-center text-blue-950-500 mb-4">Enter your credentials to continue</p>

          {mutation.isError && (
            <div className="mb-4 text-red-600">Login failed. Please check your credentials.</div>
          )}

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="input"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mt-4">
            <span className="text-white-600">New here? </span>
            <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
 