import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { IPost } from "../../../interfaces/posts";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "../../shared";
const HomeDeleteModal = React.lazy(() => import("./home-delete-modal"));
const HomeEditModal = React.lazy(() => import("./home-edit-modal"));

interface IHomePostProps {
  posts: IPost[];
  username: string;
  isLoading?: boolean;
}

const HomePost: React.FC<IHomePostProps> = ({ posts, username, isLoading }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<IPost>({
    title: "",
    content: "",
    id: "",
    username: "",
    created_datetime: "",
  } as IPost);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center">No posts available.</p>;
  }

  const handleDelete = (post: IPost) => {
    setCurrentPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (post: IPost) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <React.Suspense fallback={<Skeleton />}>
        {isDeleteModalOpen && (
          <HomeDeleteModal
            onClose={setIsDeleteModalOpen}
            currentPost={currentPost}
          />
        )}

        {isEditModalOpen && (
          <HomeEditModal
            onClose={setIsEditModalOpen}
            currentPost={currentPost}
          />
        )}
      </React.Suspense>
      {posts.map((post) => (
        <div
          key={post.id}
          className="border-t border rounded-[16px] border-modalBorder flex flex-col gap-5 mb-7"
        >
          <div className="bg-primary w-full rounded-t-[16px] flex items-center gap-5 justify-between px-5 h-[80px] py-10">
            <h2 className="font-[700] text-white text-[1rem] md:text-[1.37rem]">
              {post.title}
            </h2>
            {username === post.username && (
              <div className="flex place-items-center gap-5 text-white text-[23px]">
                <FaRegEdit
                  className="cursor-pointer"
                  onClick={() => handleEdit(post)}
                />
                <TbTrashXFilled
                  className="cursor-pointer"
                  onClick={() => handleDelete(post)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full text-[1.12rem] px-7 pb-7 gap-5">
            <div className="w-full flex justify-between items-center text-gray">
              <span>@{post.username}</span>
              <span>
                {formatDistanceToNow(new Date(post.created_datetime), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="break-words">{post.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default HomePost;
