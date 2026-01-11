import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Plus } from "lucide-react";

import MyBlogsHeader from "./MyBlogsHeader";
import MyBlogCard from "./MyBlogCard";
import { blogService } from "../../../../services/blogService";
import { userService } from "../../../../services/userService";
import { useAuth } from "../../../../context/AuthContext";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  const isOwnProfile =
    authUser && profileUser && authUser.id === profileUser.id;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      const userId = slug.split("-").pop();

      try {
        if (authUser && authUser.id === userId) {
          setProfileUser(authUser);
        } else {
          const userData = await userService.getUserById(userId);
          setProfileUser(userData);
        }

        const data = await blogService.getAllBlogs({ userId });
        setBlogs(data.blogs || []);
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [slug, authUser]);

  const handleDelete = async (id) => {
    if (!isOwnProfile) return;
    if (window.confirm("Delete this blog?")) {
      await blogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      
      {/* Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-5 mb-10 bg-white p-6 rounded-xl shadow-sm border text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <User size={36} className="text-blue-100" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            {profileUser?.name}
          </h1>
          <p className="text-gray-500 text-sm">{profileUser?.email}</p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>{blogs.length}</strong> Blogs Published
          </p>
        </div>
      </div>

      {isOwnProfile && <MyBlogsHeader />}

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No blogs published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <MyBlogCard
              key={blog._id}
              blog={{
                ...blog,
                date: formatDate(blog.createdAt),
                description: blog.content,
              }}
              onDelete={isOwnProfile ? () => handleDelete(blog._id) : null}
              onEdit={
                isOwnProfile
                  ? () => navigate(`/edit-blog/${blog._id}`)
                  : null
              }
            />
          ))}

          {/* Write New */}
          {isOwnProfile && (
            <div
              onClick={() => navigate("/create-blog")}
              className="border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-blue-50 transition min-h-[280px]"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Plus size={26} className="text-blue-600" />
              </div>
              <h3 className="font-medium">Write New Post</h3>
              <p className="text-sm text-gray-500 mt-1 text-center">
                Share your thoughts
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MyBlogs;
