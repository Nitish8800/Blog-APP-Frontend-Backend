"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Login = () => {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["token"]);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");

  useEffect(() => {
    if (cookies?.token !== undefined) {
      router.replace("/");
    }
  }, []);

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const toggleSignup = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const signupUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup",
        signup
      );

      console.log("REsponse DAta", response);

      if (response.status === 201) {
        toggleAccount("login");
        toast(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        showError(response.data.error);
      }
    } catch (error) {
      toast("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error:", error.message);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        login
      );

      if (response.status === 200) {
        toast(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const cookies = response.data.token.accessToken;
        // console.log("Login Successfull", cookies);
        setCookie("token", cookies);
        router.push("/");
      } else {
        showError(response.data.error);
      }
    } catch (error) {
      toast("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg border shadow-inner w-96">
        <img src={imageURL} alt="blog image" className="w-24 mx-auto pt-4" />

        {account === "login" ? (
          <div className="mt-5">
            <input
              type="text"
              onChange={(e) => onValueChange(e)}
              name="email"
              placeholder="Enter Email"
              className="w-full p-2 mb-2 border rounded"
              autoComplete="on"
            />
            <input
              type="password"
              onChange={(e) => onValueChange(e)}
              name="password"
              placeholder="Enter Password"
              className="w-full p-2 mb-2 border rounded"
              autoComplete="on"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              onClick={() => loginUser()}
              className="w-full bg-purple-600 hover:bg-blue-500 text-white rounded p-2 mt-3 hover:shadow-md"
            >
              Login
            </button>
            <p className="text-center mt-2">OR</p>
            <button
              onClick={() => toggleSignup()}
              className="w-full bg-[#fb641b] border text-white rounded p-2 mt-2 mb-4 hover:bg-orange-400 hover:shadow-md"
            >
              Create an account
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <input
              type="text"
              onChange={(e) => onInputChange(e)}
              name="email"
              placeholder="Enter Email"
              className="w-full p-2 mb-2 border rounded"
              autoComplete="on"
            />
            <input
              type="password"
              onChange={(e) => onInputChange(e)}
              name="password"
              placeholder="Enter Password"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              onChange={(e) => onInputChange(e)}
              name="name"
              placeholder="Enter Name"
              className="w-full p-2 mb-2 border rounded"
              autoComplete="on"
            />
            <input
              type="text"
              onChange={(e) => onInputChange(e)}
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className="w-full p-2 mb-2 border rounded"
              autoComplete="on"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={() => signupUser()}
              className="w-full bg-purple-600 hover:bg-blue-500  border text-white rounded p-2 mt-2 hover:shadow-md"
            >
              Signup
            </button>
            <p className="text-center mt-2">OR</p>
            <button
              onClick={() => toggleSignup()}
              className="w-full bg-[#fb641b] text-white rounded p-2 mt-2 mb-4 hover:bg-orange-400 hover:shadow-md"
            >
              Already have an account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
