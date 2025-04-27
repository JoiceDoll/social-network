import axios from "../axios-instance";
import { POSTS } from "../endpoints";

export const fetchPostData = async (url?: string) => {
  const endpoint = url || `${import.meta.env.VITE_API_BASE_URL}/careers/`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
export const createPost = async (data: {
  username: string;
  created_datetime: Date;
  title: string;
  content: string;
  author_ip: string;
}) => {
  const response = await axios.post(POSTS.POST, data);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await axios.delete(`${POSTS.DELETE}/${id}/`);
  return response.data;
};

export const updatePost = async (
  id: string,
  data: { title: string; content: string }
) => {
  const response = await axios.patch(`${POSTS.PUT}/${id}/`, data);
  return response.data;
};
