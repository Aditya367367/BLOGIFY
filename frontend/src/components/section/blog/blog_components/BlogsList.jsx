import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import BlogFilters from "./BlogFilters";
import Pagination from "../../../common/Pagination";
import Toast from "../../../common/Toast";
import { blogService } from "../../../../services/blogService";

const BlogsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [cats, auths] = await Promise.all([
          blogService.getCategories(),
          blogService.getAuthors(),
        ]);
        setCategories(cats || []);
        setAuthors(auths || []);
      } catch {
        setToast({ message: "Failed to load filters", type: "error" });
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    setSearchParams(prev => {
      const params = Object.fromEntries(prev);
      return { ...params, page: "1" };
    });
  }, [search, category, author]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await blogService.getAllBlogs({
          page: currentPage,
          limit: 6,
          search,
          category,
          author,
        });
        setBlogs(res.blogs || []);
        setTotalPages(res.pages || 1);
      } catch {
        setToast({ message: "Failed to load blogs", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage, search, category, author]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getReadTime = (content) =>
    `${Math.max(1, Math.ceil((content?.split(/\s+/).length || 0) / 200))} min read`;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <h1 className="text-3xl font-semibold mb-6">Latest Insights</h1>

      <BlogFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        author={author}
        setAuthor={setAuthor}
        categories={categories}
        authors={authors}
      />

      {loading ? (
        <p className="text-center mt-12">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center mt-12">No blogs found</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={{
                  ...blog,
                  date: formatDate(blog.createdAt),
                  readTime: getReadTime(blog.content),
                }}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default BlogsList;
