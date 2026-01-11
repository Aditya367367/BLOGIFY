import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { blogService } from "../../../../services/blogService";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogService.getBlogById(id);
      setBlog(data);
    } catch {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading blog...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 font-medium">
        {error}
      </div>
    );

  if (!blog)
    return <div className="text-center mt-20">Blog not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Sticky Back */}
        <div className="sticky top-0 z-10 bg-gray-50 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <ArrowLeft size={18} />
            Back to blogs
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm px-6 sm:px-10 py-8 sm:py-12">

          {/* Category */}
          {blog.category && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-6">
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6">
            {blog.title}
          </h1>

          {/* Author Card */}
          <div className="flex flex-wrap items-center gap-4 pb-8 border-b">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
                <User size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {blog.author}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover rounded-2xl my-10"
            />
          )}

          {/* Content */}
          <div
            className="
              prose
              max-w-none
              text-gray-700
              leading-loose
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
