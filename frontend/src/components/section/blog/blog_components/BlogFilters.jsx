const BlogFilters = ({ 
  search, setSearch, 
  category, setCategory, 
  author, setAuthor, 
  categories = [], 
  authors = [] 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <input
        type="text"
        placeholder="Search by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-[240px] border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-4 py-2 text-sm"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          list="authors-list"
          type="text"
          placeholder="Search Author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <datalist id="authors-list">
          {authors.map((auth) => (
            <option key={auth} value={auth} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default BlogFilters;
