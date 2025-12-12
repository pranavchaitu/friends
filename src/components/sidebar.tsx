"use client"

import { Heart, MessageCircleMore, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function() {
  const [selected, setSelected] = useState("explore")
  const content = [{
    title : "explore",
    icon : <Users size={20}/>
  }, {
    title : "likes",
    icon : <Heart size={20}/>
  }, {
    title : "chat",
    icon : <MessageCircleMore size={20}/>,
  }, {
    title : "profile",
    icon : <UserRound size={20}/>
  }]
  return <div className="flex justify-center w-52 mt-10">
    <ul className="flex flex-col justify-between gap-4 h-80">
      {content.map(({ title, icon }) => (
        <Link key={title} href={`/${title}`} onClick={() => setSelected(title)}>
          <SelectedBox title={title}>
            {icon}
            <li>
              {title}
            </li>
          </SelectedBox>
        </Link>
      ))}
    </ul>
  </div>

  function SelectedBox({ children,title } : {
    children : ReactNode,
    title : string
  }) {
    return <div className={`flex items-center gap-4 px-4 py-2 rounded-full ${selected == title && "border"}`}>
      {children}
    </div>
  }
}

