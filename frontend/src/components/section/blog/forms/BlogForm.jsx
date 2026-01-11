import { useState, useEffect, useRef } from "react";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Image,
  Code
} from "lucide-react";

const CATEGORIES = [
  "Career",
  "Finance",
  "Travel",
  "Technology",
  "Health",
  "Other"
];

const BlogForm = ({ initialData, onSubmit, loading, buttonText }) => {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Other",
    content: "",
    image: null
  });

  const [preview, setPreview] = useState("");

  /* PREFILL (EDIT MODE) */
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "Other",
        content: initialData.content || "",
        image: null
      });
      setPreview(initialData.image || "");
      if (editorRef.current) {
        editorRef.current.innerHTML = initialData.content || "";
      }
    }
  }, [initialData]);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* IMAGE */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  /* EDITOR COMMANDS (FIXED) */
  const exec = (type) => {
    editorRef.current.focus();

    switch (type) {
      case "bold":
      case "italic":
      case "underline":
        document.execCommand(type);
        break;

      case "ul":
        document.execCommand("insertUnorderedList");
        break;

      case "ol":
        document.execCommand("insertOrderedList");
        break;

      case "quote":
        document.execCommand("formatBlock", false, "blockquote");
        break;

      case "code":
        document.execCommand("formatBlock", false, "pre");
        break;

      default:
        break;
    }
  };

  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      content: editorRef.current.innerHTML
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* TITLE */}
      <InputField
        label="BLOG TITLE"
        name="title"
        placeholder="Enter an engaging title..."
        value={formData.title}
        onChange={handleChange}
        required
      />

      {/* CATEGORY + IMAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Featured Image
          </label>
          <label className="flex items-center justify-center gap-2 h-[46px] border-2 border-dashed rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50">
            <Image size={18} />
            Click to upload banner
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-56 object-cover rounded-xl border"
        />
      )}

      {/* CONTENT */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Content
        </label>

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 border border-b-0 rounded-t-xl px-3 py-2 bg-gray-50">
          <ToolbarButton icon={<Bold size={18} />} onClick={() => exec("bold")} />
          <ToolbarButton icon={<Italic size={18} />} onClick={() => exec("italic")} />
          <ToolbarButton icon={<Underline size={18} />} onClick={() => exec("underline")} />
          <ToolbarButton icon={<List size={18} />} onClick={() => exec("ul")} />
          <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => exec("ol")} />
          <ToolbarButton icon={<Quote size={18} />} onClick={() => exec("quote")} />
          <ToolbarButton icon={<Code size={18} />} onClick={() => exec("code")} />
        </div>

        {/* EDITOR */}
        <div
          ref={editorRef}
          contentEditable
          className="
            min-h-[260px]
            border
            rounded-b-xl
            px-4
            py-3
            outline-none
            prose
            max-w-none
            text-gray-700
            focus:ring-2
            focus:ring-blue-500
          "
          suppressContentEditableWarning
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center pt-6">
       
        <Button type="submit" disabled={loading}>
          {loading ? "Publishing..." : buttonText}
        </Button>
      </div>
    </form>
  );
};

const ToolbarButton = ({ icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 rounded-md hover:bg-blue-100 text-gray-700 transition"
  >
    {icon}
  </button>
);

export default BlogForm;
