import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import useGetMessages from "../../hooks/useGetMessages"; // Import useGetMessages
import Message from "./Message";
import { useEffect, useRef } from 'react';

const Messages = () => {
  const { loading, messages } = useGetMessages(); // Use useGetMessages hook to fetch messages
  // const { authUser } = useAuthContext(); // Move useAuthContext inside Messages component
  // const { selectedConverstion } = useConversation();
   console.log(messages)
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100)
    
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div 
        key={message._id}
        ref={lastMessageRef}        
        >
          <Message  message={message} />
        </div>
      ) )}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;
