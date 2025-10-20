interface ContentProps {
  content: string;
  time: string;
  setReply: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
  replyId: string | null;
}

function Content({ content, time, setReply, id, replyId }: ContentProps) {
  const newTime = new Date(time);

  const formatted = `${String(newTime.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(newTime.getDate()).padStart(
    2,
    "0"
  )}.${newTime.getFullYear()} at ${String(newTime.getHours()).padStart(
    2,
    "0"
  )}:${String(newTime.getMinutes()).padStart(2, "0")}`;

  return (
    <>
      <div>
        <div>{formatted}</div>
        <div>{content}</div>
        <div>
          <button
            className="text-blue-500 hover:underline underline-offset-4 cursor-pointer"
            onClick={() => setReply(replyId === id ? null : id)}
          >
            Reply
          </button>
        </div>
      </div>
    </>
  );
}

export default Content;
