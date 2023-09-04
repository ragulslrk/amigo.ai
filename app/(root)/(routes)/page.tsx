import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className='text-indigo-700'>
      Amigo.Ai
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
