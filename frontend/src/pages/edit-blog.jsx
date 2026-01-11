import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogService } from "../services/blogService";
import { Navbar } from "../components/layout/navbar";
import BlogForm from "../components/section/blog/forms/BlogForm";
import Toast from "../components/common/Toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      
      const data = await blogService.getBlogById(id);
      setInitialData(data);
    } catch (err) {
      setError("Failed to load blog details");
      showToast("Failed to load blog details", "error");
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      await blogService.updateBlog(id, data);
      showToast("Blog updated successfully!", "success");
      
      setTimeout(() => {
        navigate("/");
      }, 2800);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update blog";
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8">Edit Blog</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
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
