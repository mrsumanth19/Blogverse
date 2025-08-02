// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-[Outfit]">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BlogVerse</h1>
        <p className="text-lg md:text-xl mb-6">Share your thoughts with the world.</p>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <h2 className="text-3xl font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-2">Write Your Blog</h3>
            <p>Compose beautiful blogs with titles, tags, and content easily.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-2">Manage Your Profile</h3>
            <p>Access your dashboard to edit profile and manage blogs.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-2">Stay Connected</h3>
            <p>Interact with other bloggers and grow your network.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
