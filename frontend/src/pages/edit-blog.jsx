import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogService } from "../services/blogService";
import { Navbar } from "../components/layout/navbar";
import BlogForm from "../components/section/blog/forms/BlogForm";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      
      const data = await blogService.getBlogById(id);
      setInitialData(data);
    } catch (err) {
      setError("Failed to load blog details");
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      await blogService.updateBlog(id, data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8">Edit Blog</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border">
          {initialData ? (
            <BlogForm 
              initialData={initialData}
              onSubmit={handleSubmit} 
              loading={loading} 
              buttonText="Update Blog" 
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditBlogPage;
