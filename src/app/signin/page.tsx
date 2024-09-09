"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import exp from "constants";
import Cookies from "js-cookie";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
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

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="w-full mb-4">
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`w-full p-3 border-2 ${
        error ? "border-red-400" : "border-gray-200"
      } rounded-lg focus:outline-none focus:border-purple-500 transition duration-300`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.username && !isLogin)
      newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const endpoint = isLogin ? "/login" : "/signup";
    try {
<<<<<<< HEAD
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
=======
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
>>>>>>> 162fbdf4add971fe84fde6a9f10f342a56cb1481
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // AFTER GETTING MY TOKEN IN RESPONSE SETITEM IN LOCALSTORAGE
      if (response.ok) {
        console.log(isLogin ? "Login successful" : "Signup successful", data);
        /// SETTING TOKEN IN LOCALSTORAGE
        Cookies.set("jwt", data.token, { expires: 1 });
        router.push("/home");
      } else {
        console.error(isLogin ? "Login failed" : "Signup failed", data.message);
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
  };

  const handleToggleMode = () => {
    if (isLogin) {
      router.push("/signup");
    } else {
      setIsLogin(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <InputField
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              error={errors.username}
            />
          )}
          <InputField
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            error={errors.email}
          />
          <InputField
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            error={errors.password}
          />
          {errors.form && (
            <p className="text-sm text-center text-red-500">{errors.form}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={handleToggleMode}
            className="ml-1 font-medium text-purple-600 hover:text-purple-500"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
