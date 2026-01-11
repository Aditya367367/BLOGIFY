import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { User, Plus } from "lucide-react";

import MyBlogsHeader from "./MyBlogsHeader";
import MyBlogCard from "./MyBlogCard";
import Pagination from "../../../common/Pagination";
import Toast from "../../../common/Toast";
import { blogService } from "../../../../services/blogService";
import { userService } from "../../../../services/userService";
import { useAuth } from "../../../../context/AuthContext";

const MyBlogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [blogs, setBlogs] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [toast, setToast] = useState(null);

  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  const userId = slug?.split("-").pop();

  const isOwnProfile =
    authUser && profileUser && authUser.id === profileUser.id;

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return;

        if (authUser?.id === userId) {
          setProfileUser(authUser);
        } else {
          const user = await userService.getUserById(userId);
          setProfileUser(user);
        }
      } catch {
        showToast("Failed to load profile", "error");
      }
    };

    fetchProfile();
  }, [userId, authUser]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const res = await blogService.getAllBlogs({
          userId,
          page: currentPage,
          limit: 9,
        });

        setBlogs(res.blogs || []);
        setTotalPages(res.pages || 1);
        setTotalBlogs(res.total || res.blogs?.length || 0);
      } catch {
        showToast("Failed to load blogs", "error");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBlogs();
  }, [userId, currentPage]);

  const handleDelete = async (id) => {
    if (!isOwnProfile) return;

    showToast("Deleting blog...", "info");

    try {
      await blogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setTotalBlogs((prev) => prev - 1);
      showToast("Blog deleted successfully", "success");
    } catch {
      showToast("Failed to delete blog", "error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`, {
      state: {
        toast: {
          message: "You can now edit your blog",
          type: "info",
        },
      },
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row items-center gap-5 mb-10 bg-white p-6 rounded-xl shadow-sm border">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <User size={36} className="text-blue-100" />
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">
            {profileUser?.name}
          </h1>
          <p className="text-gray-500 text-sm">{profileUser?.email}</p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>{totalBlogs}</strong> Blogs Published
          </p>
        </div>
      </div>

      {isOwnProfile && <MyBlogsHeader />}

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No blogs published yet.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {blogs.map((blog) => (
              <MyBlogCard
                key={blog._id}
                blog={{
                  ...blog,
                  date: formatDate(blog.createdAt),
                }}
                onDelete={isOwnProfile ? () => handleDelete(blog._id) : null}
                onEdit={isOwnProfile ? () => handleEdit(blog._id) : null}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
};

export default MyBlogs;
