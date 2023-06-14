"use client"

import Image from 'next/image'
import { useEffect } from 'react'


import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

export default function Home() {

  useEffect(() => {
    socket.on("EVENT", (variable: string) => {
      console.log(variable)
    })
  }, [])

  const clickHandler = () => {
    socket.emit("PING", 69, 420, "BANANA")

  }
  return (
    <div>
      <button onClick={clickHandler} >Hello world</button>
    </div>
  )
}


