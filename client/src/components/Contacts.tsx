import { PlusSmallIcon } from '@heroicons/react/24/outline'
import ContactCard from './ContactCard'
import { useState } from 'react'
import Modal from '../common/Modal'
import AddContact from './AddContact'

const contacts = [
  {
    username: 'Peter Griffin',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessage: 'Woooo 🔥',
    lastMessageDate: '24m',
    pendingMessages: 2,
  },
  {
    username: 'Mason Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    lastMessage: 'Life is a journey, not a destination. 🚀',
    lastMessageDate: '24m',
    pendingMessages: 22,
  },
  {
    username: 'Olivia Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    lastMessage:
      'Happiness is not something ready-made. It comes from your own actions. 😊',
    lastMessageDate: '24m',
  },
]

const Contacts = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col w-[350px]">
        <div className="flex gap-y-4 justify-between items-center w-full h-[80px] border-b px-6">
          <div className="flex justify-center items-center gap-3">
            <h2 className="text-gray-800 font-semibold text-xl">Messages</h2>
            <div className="rounded-full bg-gray-100 text-xs p-[6px] font-bold text-gray-900">
              24
            </div>
          </div>
          <button
            className="flex w-[35px] h-[35px] justify-center items-center bg-primary hover:bg-primary/90 rounded-full"
            onClick={() => setOpen((prev) => !prev)}
          >
            <PlusSmallIcon className="w-[28px] h-[28px] text-white" />
          </button>
        </div>
        <div className="flex flex-col px-4 py-3 gap-y-3 overflow-y-auto h-full scroll-bar">
          <form>
            <input
              className="w-full h-12 form_contacts-input"
              placeholder="Search contact"
            />
          </form>

          {contacts.map((contact, index) => (
            <ContactCard
              key={`${contact.username}-${index}`}
              contact={contact}
            />
          ))}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <AddContact setOpen={setOpen} />
      </Modal>
    </>
  )
}

export default Contacts
