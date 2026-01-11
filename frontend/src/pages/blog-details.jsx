import BlogDetails from "../components/section/blog/blog_components/BlogDetails";
import { Navbar } from "../components/layout/navbar";

const BlogDetailsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogDetails />
    </div>
  );
};

export default BlogDetailsPage;
