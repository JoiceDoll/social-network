import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../shared";
import { useCreatePost } from "../../../api/queries/posts.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../schemas/post-schema";

interface IScreenFormProps {
  username: string;
  onReload: () => void;
}

type FormValues = {
  title: string;
  content: string;
};

const HomeScreenForm: React.FC<IScreenFormProps> = ({ username, onReload }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    shouldFocusError: true,
  });

  const { mutate: createPost, isPending } = useCreatePost();

  const onSubmit = (data: FormValues) => {
    createPost(
      {
        ...data,
        username,
        created_datetime: new Date(),
        author_ip: "",
      },
      {
        onSuccess: () => {
          reset();
          onReload();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[16px] border border-modalBorder p-7 flex flex-col mb-7 gap-5"
    >
      <h2 className="font-[700] text-[1.37rem]">What’s on your mind?</h2>
      <div>
        <Input
          placeholder="Hello world"
          id="title"
          label="Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-[0.8rem]">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Content here"
          id="content"
          type="textarea"
          label="Content"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-500 text-[0.8rem]">{errors.content.message}</p>
        )}
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary w-full md:w-[111px] h-[37px] md:h-[32px] rounded-[8px] text-white"
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default HomeScreenForm;
