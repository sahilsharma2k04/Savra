import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // get login from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://savra-e3iu.onrender.com/api/auth/login",
        { email, password }
      );

      // 🔥 Use context login instead of manual localStorage
      login(res.data.token);

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;