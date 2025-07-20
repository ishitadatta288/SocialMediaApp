import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { formatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom"




const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const {user} = useUserContext();

const handleDeletePost = () => {}


  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card bg-gray-800">
          <img src={post?.imageUrl} alt="post"
            className="post_details-img" />

          <div className=" flex items-center gap-3 post_details-info">
            <div className=" flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`}
              className=" flex items-center gap-3">
                <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="post"
                  className=" rounded-full lg:first-letter:w-8 lg:h-8 w-8 h-8"
                />


                <div className=" flex flex-col">
                  <p>
                    {post?.creator.name}
                  </p>
                  <div className=" flex items-center gap-2 text-gray-500">
                    <p className=" font-semibold">
                      {formatDateString(post?.$createdAt || '')}
                    </p>
                    -
                    <p className=" font-semibold">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className=" flex-center">
                  <Link to={`/update-post/${post?.$id}`} className={`${user.id! == post?.creator.$id ? '' : 'hidden'}`}>
                    <img src="/assets/icons/edit.svg" alt="edit" height={24} width={24} />
                  </Link>

                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={` ghost_details-delete_btn ${user.id!== post?.creator.$id && 'hidden'}`}
                  >
                    <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24} />
                  </Button>
              </div>
            </div>

            <hr  className=" border w-full border-stone-900"/>

            <div className=" flex flex-col flex-1 w-full small-medium lg:base-regular">
                    <p>{post?.caption}</p>
                    <ul className=" flex gap-1 mt-2">
                        {post?.tags.map((tag: string) => (
                            <li key={tag} className=" text-gray-500">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className=" w-full">
                  <PostStats post={post} userId={user.id}/>
                </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails