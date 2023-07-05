import MessageRecived from "../common/MessageRecived"
import MessageSend from "../common/MessageSend"

const messageSend1 = [
  {
    content: 'Hi',
    date: '9:02'
  },
  {
    content: 'How is everything?',
    date: '9:02'
  },
]

const messageRecived1 = [
  {
    content: 'Hi!',
    date: '9:02'
  },
  {
    content: 'Good, thanks for asking',
    date: '9:02'
  },
]

const Conversation = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col overflow-y-auto">
      <MessageSend messages={messageSend1} />
      <MessageRecived messages={messageRecived1} />
      <MessageSend messages={messageSend1} />
      <MessageRecived messages={messageRecived1} />
      <MessageSend messages={messageSend1} />
      <MessageRecived messages={messageRecived1} />
      <MessageSend messages={messageSend1} />
      <MessageRecived messages={messageRecived1} />
      <MessageSend messages={messageSend1} />
      <MessageRecived messages={messageRecived1} />
    </div>
  )
}

export default Conversation