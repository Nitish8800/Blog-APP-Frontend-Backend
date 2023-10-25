import Banner from "./components/Banner";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <div>
      <Banner />
      <Posts />
      {/* <section id="blogs" className=" text-white h-screen bg-purple-900 flex">
        <h1 className="m-auto font-waterfall text-7xl text-white font-bold">
          Blogs
        </h1>
      </section>

      <section
        id="blogs"
        className="text-white h-screen bg-black  text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-purple-600 font-bold">
          Blog
        </h1>
      </section> */}
    </div>
  );
}
