import { Link, useNavigate } from "react-router-dom";
import Button from "../../../common/Button";
import Avatar from "../../../common/Avatar";
import { useAuth } from "../../../../context/AuthContext";


const NavbarActions = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getProfileSlug = (user) => {
    if (!user) return "";
    const nameSlug = user.name.toLowerCase().replace(/\s+/g, '-');
    return `${nameSlug}-${user.id}`;
  };

  return (
    <div className="flex items-center gap-4">
      <Button
  onClick={handleLogout}
  className="
    px-4 py-2
    rounded-md
    border border-red-500
    text-red-500
    font-medium
    hover:bg-red-50
    hover:text-red-600
    transition-all
    duration-200
  "
>
  Logout
</Button>
      <Link to={`/profile/${getProfileSlug(user)}`} title={user?.name}>
        <Avatar />
      </Link>
    </div>
  );
};

export default NavbarActions;
