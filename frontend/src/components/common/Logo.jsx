import { Link } from "react-router-dom";
import logo from "/logo.png"
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-blue-600">
      <img src={logo} alt="logo" width={35} height={35} /> <span>BLOGIFY</span>
    </Link>
  );
};

export default Logo;
