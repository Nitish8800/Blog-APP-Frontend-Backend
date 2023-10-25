import Link from "next/link";
import React from "react";

const Post = ({ postData }) => {
  console.log("postData", postData);

  const url = postData.post_link
    ? postData.post_link
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <>
      <Link href={`/posts/${postData.id}`}>
        <div className="border border-d3cede rounded-md m-3 flex flex-col items-center h-96 text-center shadow-inner hover:shadow-2xl cursor-pointer">
          <img
            src={url}
            alt="post"
            className="w-full object-cover rounded-t-md h-64"
          />
          {/* <p className="text-878787 text-12">{postData.categories}</p> */}
          <h2 className="py-2 font-semibold">{postData.title}</h2>
          <p className="text-[#878787]">
            Author : {addEllipsis(postData.userId.name, 10)}
          </p>
          <p className="p-1 break-words">
            {addEllipsis(postData.description, 75)}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Post;
