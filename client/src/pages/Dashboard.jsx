import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserBlogs();
    }
  }, [user]);

 const fetchUserBlogs = async () => {
  try {
    const res = await axios.get('/api/blogs/my-blogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Blog API response:', res.data); // should be an array

    // ✔ Safe setting
    setBlogs(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.error('Failed to fetch user blogs:', error);
    setBlogs([]); // fallback to empty array
  }
};



  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-[Outfit] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section
        onClick={() => navigate('/create-blog')}
        className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 cursor-pointer hover:bg-blue-50 transition mb-8"
      >
        <FaPlusCircle className="text-4xl text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-blue-600">Create a New Blog</h2>
          <p className="text-gray-600">Share your thoughts, ideas, and stories with the community.</p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-600">You haven't written any blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="border-b border-gray-200 py-4">
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-gray-700 line-clamp-2">{blog.content}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                  blog.visibility === 'public'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {blog.visibility}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
