import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "../../shared";
import { useUpdatePost, useListPosts } from "../../../api/queries/posts.query";
import { Input } from "../../shared";
import { IPost } from "../../../interfaces/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../schemas/post-schema";

interface IHomeEditModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  currentPost: IPost;
}

type FormValues = {
  title: string;
  content: string;
};

const HomeEditModal: React.FC<IHomeEditModalProps> = ({
  onClose,
  currentPost,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...currentPost,
    },
    shouldFocusError: true,
  });

  const { mutate: updatePost, isPending } = useUpdatePost();
  const { refetch } = useListPosts();

  const id = currentPost?.id;

  const onSubmit = (data: FormValues) => {
    updatePost(
      { id, data },
      {
        onSuccess: () => {
          onClose(false);
          refetch();
        },
      }
    );
  };

  return (
    <Modal opacity={"opacity-80"} className="md:w-[660px] md:h-[400px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-10 md:gap-5 pt-60 md:pt-0"
      >
        <span className="font-[700] text-[1.37rem]">Edit item</span>

        <div>
          <Input
            placeholder="Hello world"
            id="title"
            label="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Content here"
            id="content"
            label="Content"
            type="textarea"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

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
            className="bg-saveBtn hover:bg-hover-saveBtn w-full md:w-[111px] h-[37px] md:h-[32px] rounded-[8px] text-white"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default HomeEditModal;
