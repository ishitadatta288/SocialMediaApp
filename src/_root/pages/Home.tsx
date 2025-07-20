import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import type { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  return (
    <div className="flex-1 bg-gray-900 text-white flex">
      {/* Left Sidebar or Feed */}
      <div className="home-container">
        <div className=" home-posts">
          <h2 className=" h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className=" flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
