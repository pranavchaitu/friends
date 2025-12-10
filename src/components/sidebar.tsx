import Link from "next/link";

export default function() {
  return <>
    <ul className="flex flex-col w-80 gap-4 ">
      <Link href={'/explore'}><li>explore</li></Link>
      <Link href={'/likes'}><li>likes</li></Link>
      <Link href={'/chat'}><li>chat</li></Link>
      <Link href={'/profile'}><li>profile</li></Link>
    </ul>
  </>
}