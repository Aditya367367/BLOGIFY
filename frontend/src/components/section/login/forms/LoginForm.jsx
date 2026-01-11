import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Logo from "../../../common/Logo";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      
     

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 mt-14">
        <h1 className="text-2xl font-semibold text-center">
          Welcome back
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Enter your credentials to access your blog dashboard
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm mb-5">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>

            <span className="text-blue-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button type="submit">Sign In</Button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-xs text-gray-400 text-center">
        <div className="flex justify-center gap-6 mb-2">
          <span className="cursor-pointer hover:text-blue-600">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Terms of Service
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Help Center
          </span>
        </div>
        © 2026 Blogify Inc. All rights reserved. Aditya chauhan.
      </footer>
    </div>
  );
};

export default LoginForm;
