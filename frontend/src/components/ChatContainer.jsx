import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';
import MessageInput from './MessageInput';
import { useStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser,subiscripeToMessages,unsubiscripeFromMessages}=useChatStore();
  const {authUser}=useStore();
  const messageEndRef=useRef(null);
  useEffect(()=>{
    getMessages(selectedUser._id);
    subiscripeToMessages()

    return ()=>unsubiscripeFromMessages();

  },[selectedUser._id,getMessages])

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])
  if(isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((m)=>(
          <div key={m._id}
          className={`chat ${m.senderId===authUser._id ? "chat-end": "chat-start"}`} ref={messageEndRef}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={m.senderId==authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic ||"/avatar.png" } alt='profile Pic'/>
              </div>
            </div>
            <div className='chat-header mb-1 '>
              <time className='text-xs opacity-50 ml-1'>{formatMessageTime(m.createdAt)}</time>

            </div>
            <div className='chat-bubble flex flex-col'>
              {m.image && (
                <img 
                src={m.image}
                alt='Attachment'
                className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {m.text && <p>{m.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput/>

    </div>

  )
}

export default ChatContainer