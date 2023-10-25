"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "next/link";
import { useRouter } from "next/navigation";
import Post from "./Post";

// import { getAllPosts } from "../../../service/api"; // Adjust your API import accordingly

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const fetchdata = await axios.get(`http://localhost:8000/posts`);
      const res = await fetchdata?.data?.data;
      setPostData(res);
      console.log("data", res);
    } catch (error) {
      console.log("Post Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mb-12"
        id="blogs"
      >
        {postData?.length > 0 &&
          postData?.map((el, i) => {
            console.log("map data", el);
            return (
              <div key={el._id}>
                {/* <a onClick={() => router.push(`/posts/${el.id}`)}> */}
                <Post postData={el} />
                {/* </a> */}
                {/* </Link> */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Posts;
