import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import Logo from "../../../common/Logo";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to sign up");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      
     

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-2xl font-semibold text-center">
          Join Bloghub
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Start your professional blog today.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField 
            label="Full Name" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-xs text-gray-500 mb-4">
            By signing up, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer">
              Privacy Policy
            </span>.
          </p>

          <Button type="submit">Create Account</Button>

          <div className="text-center text-xs text-gray-400 my-5">
            OR CONTINUE WITH
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 cursor-pointer">
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-xs text-gray-400">
        © 2026 Blogify Inc. All rights reserved. Aditya chauhan.
      </footer>
    </div>
  );
};

export default SignupForm;
