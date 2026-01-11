import { NavLink } from "react-router-dom";

const NavbarLinks = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer"
      : "cursor-pointer hover:text-blue-600 pb-1 border-b-2 border-transparent";

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm font-medium text-gray-600 ">
      <NavLink to="/" className={linkClass}>
        Blogs
      </NavLink>
      {/* <NavLink to="/my-blogs" className={linkClass}>
        My Blogs
      </NavLink> */}
      <NavLink to="/create-blog" className={linkClass}>
        Create Blog
      </NavLink>
    </div>
  );
};

export default NavbarLinks;
