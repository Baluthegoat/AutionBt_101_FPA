"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Button: React.FC<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition duration-300 ${className}`}
  >
    {children}
  </button>
);

const Card: React.FC<{
  title: string;
  description: string;
  content: string;
}> = ({ title, description, content }) => (
  <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <h4 className="text-md text-gray-600 mb-4">{description}</h4>
    <p>{content}</p>
  </div>
);

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      {/* Header */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">AuctionBT</span>
          <div>
            <Button
              onClick={() => router.push("/signin")}
              className="text-purple-600 hover:bg-purple-100 mr-2"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-20 px-4">
        <h1 className="text-6xl font-bold text-white text-center mb-4">
          Bid Master
        </h1>
        <p className="text-xl text-white italic mb-8 max-w-lg text-center">
          &quot;Instead of interrupting, work on attracting.&quot;
        </p>
        <Button
          onClick={() => router.push("/signup")}
          className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg mb-16"
        >
          Get Started
        </Button>

        {/* Why RabsAuction Section */}
        <section className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Why AuctionBT?
          </h2>
          <p className="text-xl mb-8 text-gray-600">We provide you with:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Service 1"
              description="Unmatched selection"
              content="Explore a massive inventory of domains handpicked to cover every niche and trend."
            />
            <Card
              title="Service 2"
              description="Affordable prices"
              content="Secure premium domains at unbeatable prices with our transparent and competitive pricing structure."
            />
            <Card
              title="Service 3"
              description="Expert support"
              content="Our team of domain specialists is available around the clock to assist you with any questions or concerns."
            />
          </div>
        </section>
      </main>
    </div>
  );
}
