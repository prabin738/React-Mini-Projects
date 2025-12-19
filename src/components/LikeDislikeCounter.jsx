import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const LikeDislikeCounter = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  let count = "";
  if (likes > dislikes) {
    count = `Likes are higher by ${likes - dislikes}`;
  } else if (likes < dislikes) {
    count = `Dislikes are higher by ${dislikes - likes}`;
  } else {
    count = `Likes and Dislikes both are equal by ${likes}`;
  }

  return (
    <div className="w-full min-h-screen flex  justify-center items-center bg-[#B7E5CD]">
      <div className="flex flex-col justify-center items-center w-[800px] h-[400px] bg-[#305669] shadow-2xl">
        <h2 className="text-[#C1785A] font-bold text-3xl mb-8 ">
          Like & Dislike Counter
        </h2>
        <div className="flex gap-6">
          <h3 className="text-[#C1785A] font-bold text-2xl mb-4 ">
            Total Likes: {likes}
          </h3>
          <h3 className="text-[#C1785A] font-bold text-2xl mb-4 ">
            Total Dislikes: {dislikes}
          </h3>
        </div>

        <div className="flex mb-4 gap-20 font-bold text-5xl text-[#c1785A]">
          <button
            onClick={() => setLikes(likes + 1)}
            className="cursor-pointer"
          >
            <BiLike />
          </button>
          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="cursor-pointer"
          >
            <BiDislike />
          </button>
        </div>
        <h3 className="text-[#C1785A] font-bold text-2xl  ">
          Difference: {count}
        </h3>
      </div>
    </div>
  );
};

export default LikeDislikeCounter;
