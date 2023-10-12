import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !password2) {
      setErrorMessage("Silakan lengkapi semua data.");
      return;
    }

    if (password !== password2) {
      setErrorMessage("Password harus sama.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password harus memiliki setidaknya 6 karakter.");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/profile");
      })
      .catch((err) => {
        setErrorMessage("Gagal mendaftar. Periksa kembali email dan password Anda.");
        console.error(err);
      });
  };

  return (
    <main className="w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-800 to-orange-500 max-w-[500px] mx-auto p-10 pt-16">
      <form
        className="w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6"
        autoComplete="off"
        onSubmit={handleRegister}
      >
        <h1 className="text-4xl text-orange-500 text-center">Register</h1>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field h-10 rounded-md border-[1px] border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-field h-10 rounded-md border-[1px] border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password2">Ulangi Password</label>
          <input
            type={showPassword2 ? "text" : "password"}
            id="password2"
            className="input-field h-10 rounded-md border-[1px] border-gray-300"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword2 ? faEye : faEyeSlash}
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword2(!showPassword2)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
          <button
            className="bg-yellow-500 hover-bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Gunakan Google
          </button>
          <Link
            to={"/login"}
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
          >
            Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
