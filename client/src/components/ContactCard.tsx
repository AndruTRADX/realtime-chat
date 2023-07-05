interface Props {
  contact: Contact
}

type Contact = {
  username: string
  avatar:  string,
  lastMessage: string
  lastMessageDate: string
  pendingMessages?: number
}

const ContactCard = ({ contact }: Props) => {
  return (
    <div className="flex justify-between items-center rounded-xl hover:bg-primary/5 p-2">
      <div className="flex gap-3">
        <img
          src={contact.avatar}
          className="w-12 h-12 rounded-xl"
        />
        <div className="flex flex-col justify-center gap-y-1 ">
          <h4 className="font-semibold text-gray-800 text-sm">
            {contact.username}
          </h4>
          <p className="font-semibold text-gray-400 text-xs max-h-12 overflow-hidden overflow-ellipsis">
            {contact.lastMessage}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3">
        <h4 className="font-semibold text-gray-400 text-sm">
          {contact.lastMessageDate}
        </h4>
        {contact.pendingMessages && (
          <div className="flex justify-center items-center px-[6px] py-[3px] rounded-full bg-green-500 text-xs text-white font-bold">
            {contact.pendingMessages}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactCard
