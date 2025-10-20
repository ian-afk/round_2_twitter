import Avatar from "./Avatar";
import Content from "./Content";

type UserTypeProp = {
  username: string;
};
interface CardsProp {
  content: string;
  user: UserTypeProp;
  createdAt: string;
  replyId: string | null;
  id: string;
  setReply: React.Dispatch<React.SetStateAction<string | null>>;
}
function Cards({ content, user, createdAt, replyId, setReply, id }: CardsProp) {
  return (
    <div className="grid grid-cols-10 align-middle p-4">
      <div className="col-span-2 border p-4">
        <Avatar user={user ? user.username : ""} />
      </div>
      <div className="col-span-8 border p-4 flex flex-col">
        <Content
          content={content}
          time={createdAt}
          setReply={setReply}
          replyId={replyId}
          id={id}
        />
      </div>
    </div>
  );
}

export default Cards;
