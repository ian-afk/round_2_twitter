import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../store";

function Post() {
  const [post, setPost] = useState("");

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ content: post }),
    onSuccess: () => {
      // 👇 Tell React Query to refetch any queries with this key
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPostMutation.mutate();
  };
  return (
    <div className="flex justify-center">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="border p-4"
          type="text"
          onChange={(e) => setPost(e.target.value)}
          name="post"
          value={post}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Post;
