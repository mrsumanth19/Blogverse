import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import Select from 'react-select';

const TAG_OPTIONS = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Health', value: 'Health' },
  { label: 'Education', value: 'Education' },
  { label: 'AI', value: 'AI' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Food', value: 'Food' },
  { label: 'Finance', value: 'Finance' },
];

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const draft = JSON.parse(localStorage.getItem('blog-draft'));
    return draft || {
      title: '',
      content: '',
      tags: [],
      visibility: 'public',
    };
  });

  const [media, setMedia] = useState({ images: [], videos: [], documents: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('blog-draft', JSON.stringify(formData));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      tags: selected.map((tag) => tag.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/blogs',
        {
          ...formData,
          images: media.images,
          videos: media.videos,
          documents: media.documents,
          author: user.name,
          authorId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      localStorage.removeItem('blog-draft');
      setSuccess('✅ Blog posted successfully!');
      setLoading(false);
      setTimeout(() => navigate('/blogs'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to create blog');
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload/file', formDataUpload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = res.data.url;
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isPDF = file.type === 'application/pdf';

      let insertText = '';
      if (isImage) {
        insertText = `![Uploaded Image](${url})`;
        setMedia((prev) => ({ ...prev, images: [...prev.images, url] }));
      } else if (isVideo) {
        insertText = `<video controls src="${url}" width="100%" />`;
        setMedia((prev) => ({ ...prev, videos: [...prev.videos, url] }));
      } else if (isPDF) {
        insertText = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(
          url
        )}&embedded=true" width="100%" height="500px" frameborder="0"></iframe>`;
        setMedia((prev) => ({ ...prev, documents: [...prev.documents, url] }));
      }

      setFormData((prev) => ({
        ...prev,
        content: `${prev.content}\n\n${insertText}`,
      }));
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = formData.content?.split(/\s+/).filter(Boolean).length || 0;
  const charCount = formData.content?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-[Outfit] max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Blog Post</h1>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-center">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Blog Content (Markdown)</label>
          <div data-color-mode="light">
            <MDEditor
              value={formData.content}
              onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              height={400}
            />
          </div>
          <p className="text-sm mt-1 text-gray-500">
            📝 Word Count: <strong>{wordCount}</strong>, Characters: <strong>{charCount}</strong>
            {charCount > 5000 && <span className="text-red-600 ml-2">⚠️ Too long!</span>}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Media (Image / Video / PDF)</label>
          <input type="file" accept="image/*,video/*,application/pdf" onChange={handleFileUpload} className="mb-4" />

          {/* Show live previews */}
          <div className="space-y-4">
            {media.images.map((img, idx) => (
              <img key={idx} src={img} alt={`uploaded-img-${idx}`} className="rounded-lg w-full" />
            ))}

            {media.videos.map((vid, idx) => (
              <video key={idx} src={vid} controls className="w-full rounded-lg" />
            ))}

            {media.documents.map((doc, idx) => (
              <div key={idx} className="rounded overflow-hidden border shadow">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(doc)}&embedded=true`}
                  title={`pdf-${idx}`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Tags</label>
          <Select
            isMulti
            options={TAG_OPTIONS}
            onChange={handleTagsChange}
            placeholder="Choose relevant tags"
          />
        </div>

        <select
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Live Markdown Preview</h2>
        <div className="prose max-w-none">
          <MDEditor.Markdown source={formData.content} skipHtml={false} />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
