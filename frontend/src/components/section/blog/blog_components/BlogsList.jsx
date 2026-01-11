import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import BlogFilters from "./BlogFilters";
import { blogService } from "../../../../services/blogService";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  
  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  
  // Options
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    // Reset to page 1 when filters change
    setPage(1);
    fetchBlogs(1, true);
  }, [search, category, author]);

  useEffect(() => {
    if (page > 1) {
      fetchBlogs(page, false);
    }
  }, [page]);

  const fetchOptions = async () => {
    try {
      const [cats, auths] = await Promise.all([
        blogService.getCategories(),
        blogService.getAuthors()
      ]);
      setCategories(cats);
      setAuthors(auths);
    } catch (err) {
      console.error("Failed to load filters");
    }
  };

  const fetchBlogs = async (currentPage, reset = false) => {
    try {
      setLoading(true);
      const params = { 
        page: currentPage, 
        limit: 10,
        search,
        category,
        author
      };
      
      const data = await blogService.getAllBlogs(params);
      
      if (reset) {
        setBlogs(data.blogs);
      } else {
        setBlogs(prev => [...prev, ...data.blogs]);
      }
      
      setHasMore(data.page < data.pages);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // Helper to calculate read time
  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content ? content.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Helper to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">Latest Insights</h1>

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

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {loading && blogs.length === 0 ? (
        <div className="mt-10">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {blogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              blog={{
                ...blog,
                date: formatDate(blog.createdAt),
                readTime: getReadTime(blog.content)
              }} 
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogsList;
