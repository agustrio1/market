import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Import ikon Google

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        className="w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-blue-500 text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button className="h-10 w-full bg-blue-500 text-white rounded lg">
            Login
          </button>
          <button
            className="h-10 w-full bg-yellow-500 text-white rounded lg"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Masuk dengan Google
          </button>
          <Link
            to={"/register"}
            className="h-10 w-full bg-slate-500 text-white rounded lg flex justify-center items-center text-center"
          >
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;