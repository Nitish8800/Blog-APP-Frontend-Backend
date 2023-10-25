"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function MyAccount() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [userUpdateData, setUserUpdateData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (cookies?.token) {
      // Fetch user data using the token
      axios
        .get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        })
        .then((response) => {
          const user = response?.data?.data;
          setUserData(user);
          // Initialize the userUpdateData state with user data
          setUserUpdateData(user);
        })
        .catch((error) => {
          toast.error("Failed to fetch user data");
        });
    }
  }, [cookies]);

  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/users/logout");

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
        removeCookie("token", cookies);
        router.push("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error.message);
    }
  };

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdateData({ ...userUpdateData, [name]: value });
  };

  const updateUser = async () => {
    try {
      const updateData = {
        name: userUpdateData.name,
        email: userUpdateData.email,
        phoneNumber: userUpdateData.phoneNumber.toString(),
      };
      const response = await axios.put(
        "http://localhost:8000/users/me/update",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
            "Content-Type": "application/json",
          },
        }
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

        // Update only the specific fields in userData
        setUserData({ ...userData, ...userUpdateData });
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to update");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen p-4 m-24">
      <h1 className="text-3xl font-semibold mb-4">My Account</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={userUpdateData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={userUpdateData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={userUpdateData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={() => updateUser()}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            onClick={() => logoutUser()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
