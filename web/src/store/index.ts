import { api } from "./axios";

import type { SignupI, SignInI, DataI } from "../types/common";
export const signIn = async ({ email, password }: SignInI) => {
  const res = await api.post(
    `/api/users/signin`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(res.data);

  return res.data;
};

export const signUp = async ({
  username,
  email,
  password,
  fullName,
}: SignupI) => {
  const res = await api.post(
    `/api/users/signup`,
    {
      username,
      email,
      password,
      fullName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const getPost = async () => {
  const res = await api.get<DataI[]>(`/api/post`, { withCredentials: true });
  console.log(res.data);

  return res.data;
};

export const createPost = async ({ content }: { content: string }) => {
  const res = await api.post(
    "/api/post",
    {
      content,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const createComment = async ({
  text,
  post,
}: {
  text: string;
  post: string;
}) => {
  const res = await api.post(
    "/api/comments/",
    { text, post },
    { withCredentials: true }
  );

  return res.data;
};
