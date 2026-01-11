import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`)}
      className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
     <img
  src={blog.image || "https://picsum.photos/600/400"}
  alt={blog.title}
  className="w-full h-48 object-cover rounded-t-xl"
/>


      <div className="p-5">
        <span className="inline-block mb-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
          {blog.category}
        </span>

        <h3 className="font-semibold text-lg leading-snug mb-3">
          {blog.title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          {/* USER AVATAR */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <User size={14} className="text-blue-100" />
          </div>

          <div>
            <p className="text-gray-700 font-medium">
              {blog.author}
            </p>
            <p className="text-xs">
              {blog.date} · {blog.readTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
