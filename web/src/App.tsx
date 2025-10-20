import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Cards from "./components/Cards";
import Login from "./pages/Login";
import { getPost } from "./store";
import Post from "./components/Post";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Comment from "./components/Comment";
import Avatar from "./components/Avatar";
import Content from "./components/Content";
import Signup from "./pages/Signup";
import type { DataI } from "./types/common";

function App() {
  const { user } = useAuth();
  const loggedInUser = user;

  console.log(loggedInUser);

  const { data, isSuccess, isLoading } = useQuery<DataI[]>({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  const [isLogIn, setIsLogin] = useState(false);

  const [replyId, setReplyId] = useState<string | null>(null);
  return (
    <>
      {user ? (
        <button>Log out</button>
      ) : (
        <div className="space-x-4 text-blue-500 ">
          <button
            className="underline underline-offset-2"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className="underline underline-offset-2"
            onClick={() => setIsLogin(false)}
          >
            Singup
          </button>
        </div>
      )}
      {isLogIn ? user ? "" : <Login /> : <Signup />}

      <Post />
      {isLoading && <p>Loading...</p>}
      {}
      {isSuccess &&
        data.map(({ content, _id, user, createdAt, comments }: DataI) => (
          <>
            <div className="relative">
              <Cards
                key={_id}
                content={content}
                user={user}
                createdAt={createdAt}
                replyId={replyId}
                id={_id}
                setReply={setReplyId}
              />
            </div>
            {replyId === _id && (
              <Comment
                fullName={loggedInUser?.fullName}
                post={_id}
                setReplyId={setReplyId}
              />
            )}
            {comments.map(({ user, text, createdAt, _id }) => (
              <div
                className="ml-16 border w-[700px]  grid grid-cols-10"
                key={_id}
              >
                <div className="col-span-2">
                  <Avatar user={user.username} />
                </div>
                <div className="col-span-8">
                  <Content
                    content={text}
                    time={createdAt}
                    setReply={setReplyId}
                    id={_id}
                    replyId={replyId}
                  />
                </div>
              </div>
            ))}
          </>
        ))}
    </>
  );
}

export default App;
