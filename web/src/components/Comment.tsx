import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type SetStateAction } from "react";
import { createComment } from "../store";

interface CommentProps {
  fullName: string | undefined;
  post: string;
  setReplyId: React.Dispatch<SetStateAction<string | null>>;
}

function Comment({ fullName, post, setReplyId }: CommentProps) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const createCommentMutation = useMutation({
    mutationFn: () =>
      createComment({
        text: comment,
        post,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setReplyId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCommentMutation.mutate();
  };
  return (
    <div className="ml-16 border w-100 flex gap-2">
      <div className="border">{fullName}</div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 w-full"
          placeholder="Post a reply"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" value="Reply" />
      </form>
    </div>
  );
}

export default Comment;
