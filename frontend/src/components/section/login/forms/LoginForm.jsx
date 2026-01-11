import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";
import Toast from "../../../common/Toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      showToast("Logged in successfully!", "success");
      console.log("Login successful, redirecting in 2800ms");

      setTimeout(() => {
        window.location.href = "/";
      }, 2800);
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Failed to login";
      console.log("Showing error toast:", errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 mt-14">
        <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Enter your credentials to access your blog dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
