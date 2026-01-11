import { Pencil, Trash2 } from "lucide-react";

const MyBlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
      
      {/* Image */}
      <div className="relative h-44 sm:h-48">
        <img
          src={blog.image || "https://picsum.photos/500/300"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-xs text-blue-600 uppercase mb-2">
          {blog.date}
        </p>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
          {blog.description}
        </p>

        {/* Actions */}
        <div className="
          mt-auto
          flex flex-col gap-2
          sm:flex-row sm:gap-3
          lg:justify-end
        ">
          {onEdit && (
            <button
              onClick={onEdit}
              className="
                w-full
                sm:w-auto
                px-4
                py-2
                flex items-center justify-center gap-2
                bg-blue-600 text-white text-sm
                rounded-lg
                hover:bg-blue-700
                transition
              "
            >
              <Pencil size={16} />
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="
                w-full
                sm:w-auto
                px-4
                py-2
                flex items-center justify-center gap-2
                border border-blue-200
                text-blue-600 text-sm
                rounded-lg
                hover:bg-blue-50
                transition
              "
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
