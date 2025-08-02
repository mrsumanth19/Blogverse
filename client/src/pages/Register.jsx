import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-[Outfit] px-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={togglePassword}
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={toggleConfirm}
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
