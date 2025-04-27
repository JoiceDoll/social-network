import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "../../shared";
import { useDeletePost, useListPosts } from "../../../api/queries/posts.query";
import { IPost } from "../../../interfaces/posts";

interface IHomeDeleteModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  currentPost: IPost;
}

const HomeDeleteModal: React.FC<IHomeDeleteModalProps> = ({
  onClose,
  currentPost,
}) => {
  const { handleSubmit } = useForm();
  const { mutate: deletePost, isPending } = useDeletePost();
  const { refetch } = useListPosts();

  const onSubmit = () => {
    deletePost(currentPost.id, {
      onSuccess: () => {
        onClose(false);
        refetch();
      },
    });
  };

  return (
    <Modal opacity={"opacity-80"} className="md:w-[500px] md:h-[146px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-10 md:gap-5 pt-60 md:pt-0"
      >
        <span className="font-[700] text-[1.37rem]">
          Are you sure you want to delete this item?
        </span>
        <div className="w-full flex justify-center gap-5 mt-5 md:justify-end">
          <Button
            type="button"
            onClick={() => onClose(false)}
            className="bg-transparent text-black w-full md:w-[111px] h-[37px] md:h-[32px] rounded-[8px] border border-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-deleteBtn hover:bg-hover-deleteBtn w-full md:w-[111px] h-[37px] md:h-[32px] rounded-[8px] text-white"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default HomeDeleteModal;
