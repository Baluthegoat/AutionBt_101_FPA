// File: src/app/signup/page.tsx

"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  form?: string;
}

interface InputFieldProps {
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, onChange, placeholder, type = "text", error }) => (
  <div className="w-full mb-4">
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`w-full p-3 border-2 ${error ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-purple-500 transition duration-300`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful', data);
        router.push('/signin'); 
        console.error('Registration failed', data.message);
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', form: '' }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            error={errors.name}
          />
          <InputField
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            error={errors.email}
          />
          <InputField
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password (6 or more characters)"
            error={errors.password}
          />
          <InputField
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            error={errors.phoneNumber}
          />
          {errors.form && <p className="text-sm text-center text-red-500">{errors.form}</p>}
          <button
            type="submit"
            className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            SIGN UP
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <button
            onClick={() => router.push('/signin')}
            className="ml-1 font-medium text-purple-600 hover:text-purple-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}