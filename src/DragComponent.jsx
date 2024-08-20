import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {motion} from 'framer-motion'

export default function DragComponent() {
  return (
    <div className = 'relative bg-white overflow-hidden'>
        <div className = 'text-[10vw] lg:text-[7vw] uppercase text-black leading-none anton-regular w-fit'>
          Launching soon..
        </div>
        <motion.div
          className = 'absolute inset-y-0 -right-[100%] left-[30vw] lg:left-[20vw] bg-white'
          drag = 'x'
          dragConstraints = {{left:0,right:0}}
          dragTransition = {{bounceStiffness:600,bounceDamping:28}}
          dragElastic = {1}
        >
            <div className = 'aspect-[1/3] h-full bg-black flex justify-center items-center poppins-medium '><div className = 'bg-clip-text text-transparent bg-gradient-to-b from-white from-50% to-black' style = {{rotate:'-90deg'}}>Drag</div></div>
          </motion.div>
    </div>
  )
}