import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    visibility: 'public',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/blogs',
        {
          ...formData,
          author: user.name,
          authorId: user.id,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setLoading(false);
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-[Outfit] max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Blog Post</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="content"
          placeholder="Write your content here..."
          rows="8"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
