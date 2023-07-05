import { Link } from 'react-router-dom'
import { GoogleIcon, navlist } from '../constants'
import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  CameraIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/auth'

const Login = () => {
  const currentHour = new Date().getHours()
  const currentMinutes = new Date().getMinutes()
  const auth = useAuth()

  const login = () => {
    auth.login({
      username: 'Peter',
      avatarURL: 'https://randomuser.me/api/portraits/men/2.jpg',
    })
  }

  return (
    <main className="flex justify-center min-h-screen relative">
      <div className="gradient-03 z-0 xl:block hidden" />
      <nav className="absolute md:flex w-full justify-center items-center z-20 hidden ">
        <div className="flex justify-between items-center min-w-full py-5 p-8 xl:px-32">
          <div className="bg-primary rounded-full p-2 shadow-sm">
            <ChatBubbleOvalLeftIcon className="w-8 h-8 text-white" />
          </div>

          <div className="flex gap-x-8 lg:gap-x-16">
            {navlist.map((item) => (
              <Link
                to={item.href}
                target="_blank"
                key={item.name}
                className="font-medium text-gray-800 cursor-pointer text-[17px] hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <section className="flex-[0.5] flex flex-col justify-center items-center z-10">
        <div className="p-[30px]">
          <h1 className="font-bold text-7xl mb-24 leading-[90px]">
            <span className="text-gradient">Instant Messages</span>
            <br />
            <span className="text-gradient">Real Connections</span>
          </h1>
          <button
            className="flex gap-2 items-center bg-white border border-gray-300 shadow-md rounded-xl py-3 px-4 text-gray-500 font-medium hover:bg-gray-50"
            onClick={() => login()}
          >
            <img src={GoogleIcon} alt="google" className="w-[24px] h-[24px]" />
            Continue with Google
          </button>
        </div>
      </section>
      <section className="flex-[0.5] flex flex-col justify-center items-center z-10">
        <div className="p-3 flex justify-between gap-4 items-center border rounded-xl border-gray-300 bg-white shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/women/2.jpg"
            alt="random women"
            className="w-[40px] h-[40px] rounded-[10px]"
          />
          <div className="flex flex-col">
            <h4 className="text-gray-800 font-semibold text-lg">
              Romina Ranolds
            </h4>
            <div className="flex flex-row justify-start items-center gap-1">
              <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
              <p className="text-gray-500">Online</p>
            </div>
          </div>
        </div>

        <div className="p-3 mt-4 ml-24 flex justify-between gap-4 items-center border rounded-xl border-gray-300 bg-white shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/men/2.jpg"
            alt="random women"
            className="w-[40px] h-[40px] rounded-[10px]"
          />
          <div className="flex flex-col">
            <h4 className="text-gray-800 font-semibold text-lg">
              Aiden Parker
            </h4>
            <div className="flex flex-row justify-start items-center gap-1">
              <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
              <p className="text-gray-500">Online</p>
            </div>
          </div>
        </div>

        <div className="p-3 mt-4 mr-24 flex justify-between gap-4 items-center border rounded-xl border-gray-300 bg-white shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/women/7.jpg"
            alt="random women"
            className="w-[40px] h-[40px] rounded-[10px]"
          />
          <div className="flex flex-col">
            <h4 className="text-gray-800 font-semibold text-lg">
              Sophia Anderson
            </h4>
            <div className="flex flex-row justify-start items-center gap-1">
              <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
              <p className="text-gray-500">Online</p>
            </div>
          </div>
        </div>

        <div className="p-3 mt-6 mr-8 flex flex-col justify-center gap-1 items-start border border-message-received border-gray-300 bg-white shadow-lg">
          <p className="text-gray-800 text-base font-medium">
            I wish you good luck, keep going.
          </p>
          <p className="text-gray-500 text-xs">
            {currentHour}:{currentMinutes}
          </p>
        </div>

        <div className="p-3 mt-4 ml-8 flex flex-col justify-center gap-1 items-start border-message-send max-w-[270px] bg-primary shadow-lg">
          <p className="text-white text-base font-medium leading-[20px]">
            Thank you so much, I promise I will never give up.
          </p>
          <p className="text-gray-100 text-xs">
            {currentHour}:{currentMinutes}
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="bg-primary/5 rounded-xl p-2 shadow-sm hover:scale-110 transition-[transform]">
            <ChatBubbleOvalLeftIcon className="w-7 h-7 text-primary" />
          </div>
          <div className="bg-primary rounded-xl p-2 shadow-sm hover:scale-110 transition-[transform]">
            <PaperAirplaneIcon className="w-7 h-7 text-white" />
          </div>
          <div className="bg-primary/5 rounded-xl p-2 shadow-sm hover:scale-110 transition-[transform]">
            <CameraIcon className="w-7 h-7 text-primary" />
          </div>
          <div className="bg-primary/5 rounded-xl p-2 shadow-sm hover:scale-110 transition-[transform]">
            <UsersIcon className="w-7 h-7 text-primary" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
