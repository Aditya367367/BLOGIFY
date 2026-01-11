import { User } from "lucide-react";

const Avatar = () => {
  return (
    <div
      className="
        w-9 h-9
        rounded-full
        bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center
        cursor-pointer
        shadow-sm
        hover:shadow-md
        hover:scale-105
        transition-all
        duration-200
        border border-blue-100
      "
    >
      <User size={18} className="text-blue-100" />
    </div>
  );
};

export default Avatar;
