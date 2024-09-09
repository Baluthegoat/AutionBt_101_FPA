"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import femaleAvatar from "../assets/female.jpeg";
import maleAvatar from "../assets/male.jpeg";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  avatar?: string;
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

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    avatar: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const avatars = [femaleAvatar, maleAvatar];

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful", data);
        router.push("/signin");
      } else {
        console.error("Registration failed", data.message);
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

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({ ...prev, avatar }));
    setErrors((prev) => ({ ...prev, avatar: "", form: "" }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Create Account
        </h1>
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Avatar</label>
            <div className="flex space-x-4">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar.src}
                  alt={`Avatar ${index + 1}`}
                  className={`w-20 h-20 rounded-full cursor-pointer border-4 ${
                    formData.avatar === avatar.src
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => handleAvatarSelect(avatar.src)}
                />
              ))}
            </div>
            {errors.avatar && (
              <p className="mt-1 text-xs text-red-500">{errors.avatar}</p>
            )}
          </div>
          {errors.form && (
            <p className="text-sm text-center text-red-500">{errors.form}</p>
          )}
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
            onClick={() => router.push("/signin")}
            className="ml-1 font-medium text-purple-600 hover:text-purple-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
