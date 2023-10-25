"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Image from "next/image";

const PostID = ({ params }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [postDetails, setPostDetails] = useState({});

  const postId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      })
      .then((response) => {
        const post = response?.data?.data;
        console.log("Post ID Data", post);
        setPostDetails(post);
      })
      .catch((error) => {
        toast.error("Failed to fetch user data");
      });
  }, [cookies, postId]);

  return (
    <>
      <div className="mb-20 m-2">
        <Image
          src={postDetails.post_link || url}
          className=" object-contain bg-contain bg-center h-[400px] flex items-center lg:items-end xl:items-end justify-center mt-28 min-w-full"
          alt="post"
          width={500}
          height={500}
          quality={100}
        />
        <div className="float-right"></div>
        <h1 className="text-3xl font-semibold text-center my-10">
          {postDetails?.title}
        </h1>
        <div className="flex items-center justify-between text-gray-500 my-4">
          <p className="text-[#878787] font-bold">
            Author :&nbsp;
            <span className="capitalize font-semibold">
              {postDetails?.userId?.name}
            </span>
          </p>
          <p>{new Date(postDetails?.createdAt).toDateString()}</p>
        </div>
        <p className="break-words">{postDetails?.description}</p>
      </div>
    </>
  );
};

export default PostID;
