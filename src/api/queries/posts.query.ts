import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchPostData,
  createPost,
  deletePost,
  updatePost,
} from "../repositories/posts.repository";

export const POST_QUERY_KEY = "posts";
export const LIST_POSTS_QUERY_KEY = "list";
export const DELETE_POST_QUERY_KEY = "delete";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
};

export const useListPosts = (url?: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchPostData(url),
    retry: 0,
    staleTime: 1000 * 60 * 60 * 1,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DELETE_POST_QUERY_KEY],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; content: string };
    }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIST_POSTS_QUERY_KEY],
      });
    },
  });
};
