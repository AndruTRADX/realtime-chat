import {
  CameraIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import Conversation from './Conversation'

const Chat = () => {
  return (
    <div className="flex flex-col w-full border-x border-gray-300">
      <div className="flex justify-between items-center w-full h-[80px] border-b border-gray-300 p-6">
        <div className="flex gap-4">
          <img
            src="https://randomuser.me/api/portraits/men/4.jpg"
            className="w-[40px] h-[40px] rounded-xl"
          />
          <div className="flex flex-col justify-start items-start">
            <h2 className="font-semibold text-lg text-gray-800">
              Peter Griffin
            </h2>
            <div className="flex justify-start items-center gap-x-1 font-semibold text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              Online
            </div>
          </div>
        </div>

        <button className="w-[44px] h-[44px] flex justify-center items-center bg-primary/10 rounded-lg">
          <EllipsisHorizontalIcon className="w-6 h-6 text-primary" />
        </button>
      </div>
      
      <Conversation />

      <div className="flex justify-between gap-x-8 items-center w-full border-y border-gray-300 p-6">
        <CameraIcon className="w-6 h-6 text-gray800" />
        <form className="w-full flex items-center gap-4">
          <textarea className="chat-textarea" placeholder="Type a message" />
          <button type="submit" className="bg-primary/10 w-10 h-10 flex justify-center items-center rounded-full">
            <PaperAirplaneIcon className="w-6 h-6 text-primary" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
