import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";
import Toast from "../../../common/Toast";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup({ name, email, password });
      showToast("Account created successfully!", "success");
      console.log("Signup successful, redirecting in 2800ms");

      setTimeout(() => {
        window.location.href = "/";
      }, 2800);
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage = err.response?.data?.message || "Failed to sign up";
      console.log("Showing error toast:", errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-2xl font-semibold text-center">
          Join Blogify Today
        </h1>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
