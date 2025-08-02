import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Register from './pages/Register'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';   // import here
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-outfit bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />  {/* new route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
