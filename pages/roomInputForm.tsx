import { useRouter } from "next/router"

export default function RoomInputForm() {
  const router = useRouter()

  const enterRoom = (e) => {
    e.preventDefault()
    router.push("/rooms/" + e.target.roomId.value)
  }

  const createRoom = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_SHAMO_API_URL + 'rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json().then(data => {
        router.push("/rooms/" + data.Room_id)
      }))
  }

  return (
    <>
      <div className="h-96 flex justify-center items-center">
        <div className="bg-white w-96 rounded-md">
          <h1 className="text-lg font-bold text-gray-500">Enter the Room ID</h1>
          <form className="mt-3 mb-2 border-2 py-1 px-3 flex rounded-md" onSubmit={enterRoom}>
            <input className="text-gray-600 outline-none w-80" id="roomId" type="text" placeholder="Input Room ID..." />
            <button className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          <h2 className="text-gray-500 mb-2 py-2">OR</h2>
          <button onClick={createRoom} className="bg-gray-200 text-gray-500 text-lg font-bold hover:bg-gray-300 rounded-md py-2 w-full">Create Room</button>
        </div>
      </div>
    </>
  )
}
