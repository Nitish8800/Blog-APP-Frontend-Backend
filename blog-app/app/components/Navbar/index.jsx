"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import blogIcon from "../../../public/blogger-blog-svgrepo-com.svg";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [renderClientContent, setRenderClientContent] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    setRenderClientContent(true);
  }, [pathname]);

  // const logoutUser = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/users/logout");

  //     // console.log("Response Logout", response);

  //     setNavbar(!navbar);
  //     if (response.status === 200) {
  //       toast(response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       removeCookie("token", cookies);
  //       router.push("/login");
  //     } else {
  //       // showError(response.data.error);
  //     }
  //   } catch (error) {
  //     toast("Something went wrong", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.error("Error:", error.message);
  //   }
  // };

  return (
    <div>
      <nav className="w-full bg-white fixed top-0 left-0 right-0 z-10 shadow-lg">
        {renderClientContent && (
          <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                {/* LOGO */}
                <Link href="/">
                  <Image
                    src={blogIcon}
                    alt="blog icon"
                    className="w-10 mx-auto"
                  />
                </Link>
                {/* HAMBURGER BUTTON FOR MOBILE */}
                <div className="md:hidden ">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <Image
                        src="/close.svg"
                        width={30}
                        height={30}
                        alt="logo"
                      />
                    ) : (
                      <Image
                        src="/hamburger-menu.svg"
                        width={30}
                        height={30}
                        alt="logo"
                        className="focus:border-none active:border-none"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "p-12 md:p-0 block" : "hidden"
                }`}
              >
                <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                  <li
                    className={`pb-6 text-xl lg:text-black-600 lg:hover:text-purple-600 xl:hover:text-purple-600 hover:text-white py-6 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent ${
                      pathname === "/" ? "text-purple-600" : ""
                    }`}
                  >
                    <Link href="/" onClick={() => setNavbar(!navbar)}>
                      Home
                    </Link>
                  </li>
                  <li
                    className={`pb-6 text-xl lg:text-black-600 lg:hover:text-purple-600 xl:hover:text-purple-600 hover:text-white py-6 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent ${
                      pathname === "/#blogs" ? "text-purple-600" : ""
                    }`}
                  >
                    <Link
                      href={!isHomePage ? "/#blogs" : "#blogs"}
                      onClick={() => setNavbar(!navbar)}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li
                    className={`pb-6 text-xl lg:text-black-600 lg:hover:text-purple-600 xl:hover:text-purple-600 hover:text-white py-6 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent ${
                      pathname === "/#contact" ? "text-purple-600" : ""
                    }`}
                  >
                    <Link href="#contact" onClick={() => setNavbar(!navbar)}>
                      Contact
                    </Link>
                  </li>
                  {cookies?.token ? (
                    <li
                      className={`pb-6 text-xl lg:text-black-600 lg:hover:text-purple-600 xl:hover:text-purple-600 hover:text-white py-6 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent ${
                        pathname === "/my-account" ? "text-purple-600" : ""
                      }`}
                    >
                      <Link
                        href="/my-account"
                        onClick={() => setNavbar(!navbar)}
                      >
                        My Account
                      </Link>
                    </li>
                  ) : (
                    <li
                      className={`pb-6 text-xl lg:text-black-600 lg:hover:text-purple-600 xl:hover:text-purple-600 hover:text-white py-6 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent ${
                        pathname === "/login" ? "text-purple-600" : ""
                      }`}
                    >
                      <Link href="/login" onClick={() => setNavbar(!navbar)}>
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
