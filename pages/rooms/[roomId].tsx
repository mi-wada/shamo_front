import { useRouter } from "next/router"
import useSWR from 'swr';

import Navbar from "./navbar";
import Users from "./users";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const router = useRouter()
  const { roomId } = router.query
  const { data: users, error: usersError } = useSWR(process.env.NEXT_PUBLIC_SHAMO_API_URL + 'rooms/' + roomId + '/users', fetcher);
  const { data: payments, error: paymentsError } = useSWR(process.env.NEXT_PUBLIC_SHAMO_API_URL + 'rooms/' + roomId + '/payments', fetcher);
  // TODO: GET paymants data

  if (!(users && payments)) return <div>loading...</div>
  return (
    <>
      <Navbar users={users} payments={payments} roomId={roomId} />
      <Users users={users} payments={payments} />
    </>
  )
}
