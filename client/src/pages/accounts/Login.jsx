import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Mohon lengkapi Email dan Password");
      return;
    }

    try {
      setError("");
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Email atau Password Salah");
    }
  };

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className="w-screen min-h-screen flex flex-col bg-gradient-to-tr from-blue-800 to-blue-500 max-w-[500px] mx-auto p-10 pt-32">
      <form
        className="w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg p-6"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-blue-500 text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field h-10 rounded-md border-[1px] border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field h-10 rounded-md border-[1px] border-gray-300"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Masuk dengan Google
          </button>
          <Link to={"/register"} className="bg-slate-500 hover:bg-slate-600 text-white text-center font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
