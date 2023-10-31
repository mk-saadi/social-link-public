import { CiMenuKebab } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import MakePost from "./MakePost";
import PostContent from "../../hook/PostContent";
// import LikeButton from "../../button/LikeButton";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [focusedPostId, setFocusedPostId] = useState(null);

  const handleFocusPostInput = (postId) => {
    setFocusedPostId(postId);
  };

  const handleBlurPostInput = () => {
    setFocusedPostId(null);
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get("https://social-link-server-liard.vercel.app/posts")
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        const postsWithTimeDifference = data.map((post) => ({
          ...post,
          timeDifference: getTimeDifference(post.createdAt),
        }));

        // Reverse the array to display new posts first
        const reversedPosts = postsWithTimeDifference.reverse();

        setPosts(reversedPosts);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function getTimeDifference(timestamp) {
    const now = new Date();
    const createdTime = new Date(timestamp);
    const timeDifference = now - createdTime;
    const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutesDifference = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );

    if (hoursDifference >= 24) {
      const daysDifference = Math.floor(hoursDifference / 24);
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return "just now";
    }
  }

  console.log(posts);

  return (
    <div>
      <MakePost />
      <div>
        {posts.map((po) => (
          <div key={po._id}>
            <div className="bg-[#d3ccbe] border-2 m-8 mt-16 border-gray-300 shadow-md rounded-lg">
              {/* top bar */}
              <div className="flex justify-between items-center mx-4 mt-4 bg-transparent">
                <div className="flex justify-center items-center bg-transparent">
                  <div className="w-10 lg:w-16 rounded-full ">
                    <img
                      src={po?.uploaderImage}
                      alt=""
                      className="rounded-full hidden md:block"
                    />
                  </div>
                  <div className="flex flex-col ml-4 bg-transparent">
                    <p className="text-2xl text-gray-700  font-semibold cursor-pointer bg-transparent">
                      {po?.uploaderName}
                    </p>
                    <p className="text-lg text-gray-500 bg-transparent">
                      {po.timeDifference}
                    </p>
                  </div>
                </div>

                <CiMenuKebab className="text-3xl text-gray-700 ml-2 font-semibold cursor-pointer bg-transparent" />
              </div>
              {/* top bar */}

              {/* body */}
              <div className="mx-4 mt-8  bg-transparent">
                <PostContent content={po?.name} />

                <img
                  src={po?.image}
                  alt="post image"
                  className="my-6 w-full rounded-md"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-around items-center">
                <div className="flex justify-start items-center gap-8 w-full mx-4 mr-16">
                  <AiFillHeart className="button-11" />
                  {/* <LikeButton /> */}

                  <FaComment className="text-gray-700 text-5xl" />
                  <div className="relative transition-height duration-300">
                    <input
                      type="text"
                      placeholder="Comment"
                      className={`input input-bordered border-gray-400 w-full focus:outline-none bg-transparent rounded-md h-10 focus:h-20 pl-3 pr-12 ${
                        focusedPostId === po._id ? "border-gray-500" : ""
                      }`}
                      onFocus={() => handleFocusPostInput(po._id)}
                      onBlur={handleBlurPostInput}
                    />
                    {focusedPostId === po._id && (
                      <button className="absolute right-2 top-6 text-sm bg-gray-700 text-white p-2 px-3 rounded-md">
                        Send
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8 mr-4">
                  <FaShare className="text-gray-700 text-4xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
