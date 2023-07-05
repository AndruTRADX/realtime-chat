import { UserPlusIcon } from '@heroicons/react/24/outline'

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddContact = ({ setOpen }: Props) => {
  return (
    <form
      onSubmit={() => setOpen((prev) => !prev)}
      className="flex flex-col gap-y-12 w-full justify-center items-center py-4"
    >
      <div className="flex justify-center items-center gap-x-8 text-3xl font-bold text-gray-800">
        <h2>Add new Contact </h2>
        <div className="p-2 bg-primary/10 rounded-full">
          <UserPlusIcon className="w-7 h-7 text-primary" />
        </div>
      </div>
      <input
        type="email"
        className="contact_modal-input"
        placeholder="john.doe@example.com"
      />
      <div className="flex w-full justify-end items-center">
        <button
          type="submit"
          className="px-4 p-3 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-white"
        >
          Add Contact
        </button>
      </div>
    </form>
  )
}

export default AddContact
