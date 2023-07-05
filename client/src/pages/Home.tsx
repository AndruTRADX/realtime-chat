import Chat from "../components/Chat"
import Contacts from "../components/Contacts"
import Settings from "../components/Settings"

const Home = () => {
  return (
    <main className="flex min-h-screen bg-white h-screen">
      <Settings />
      <Contacts />
      <Chat />
    </main>
  )
}

export default Home