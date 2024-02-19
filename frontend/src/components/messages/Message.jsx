import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConverstion } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConverstion?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // Check if _id exists before logging it
  if (message._id) {
    console.log(message._id);
  }

  // console.log(message)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="Tailwind css chat"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-white text-xs flex gap-1 items-center">{formattedTime}</div>
    </div>
  );
};

export default Message;
