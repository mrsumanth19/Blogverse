import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className=" p-6 font-[Outfit] max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>

      {loading ? (
        <p className="text-center">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-3xl text-gray-600 mr-2" />
                <span className="text-lg font-semibold">
                  {blog.author?.name || 'Unknown'}
                </span>
              </div>

              {/* Blog Title */}
              <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>

              {/* Full Content */}
              <p className="text-gray-700 mb-4 whitespace-pre-line">{blog.content}</p>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
