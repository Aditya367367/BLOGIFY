const MyBlogsHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold">My Blogs</h1>
      <p className="text-gray-500 mt-1 text-sm sm:text-base">
        Manage your published articles.
      </p>

      <div className="flex items-center gap-6 mt-6 border-b">
        <span className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium cursor-pointer">
          All Posts
        </span>
      </div>
    </div>
  );
};

export default MyBlogsHeader;
