import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Custom404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>

        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Page not found
        </p>

        <p className="mt-2 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
