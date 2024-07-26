import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('Form data:', data);
        try {
            const res = await axios.post('/api/auth/login', data);
            localStorage.setItem('authToken', res.data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data) {
                setLoginError(err.response.data.message || 'An unexpected error occurred');
                toast.error(loginError);
            } else {
                setLoginError('An unexpected error occurred');
                toast.error(loginError);
            }
            console.error(err);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1721804978061-2c23db2b5e4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
                    alt="Background"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 opacity-20"></div>
            </div>
            <div className="relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                        />
                        {errors.email && <p className="mt-2 text-red-600 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                        />
                        {errors.password && <p className="mt-2 text-red-600 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-300 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <a href="/register" className="text-indigo-600 hover:text-indigo-700">Go to Register</a>
                </div>
                {loginError && <p className="text-red-600 text-center">{loginError}</p>}
            </div>
        </div>
    );
};

export default Login;