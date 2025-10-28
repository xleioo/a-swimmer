"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Floating, { FloatingElement } from "@/components/parallax-floating"

// 示例图片 - 使用 Unsplash 提供的占位图
const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=500&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=500&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=400&h=400&fit=crop",
  },
  {
    url: "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=400&h=500&fit=crop",
  },
]

export default function Hero() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    )
  }, [animate])

  return (
    <div
      className="relative w-full h-[80vh] flex justify-center items-center bg-gradient-to-b from-background to-background/50 overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-6 items-center flex flex-col px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <h1 className="text-5xl md:text-7xl z-50 font-bold tracking-tight">
          A Swimmer
        </h1>
        <p className="text-xl md:text-2xl z-50 text-muted-foreground max-w-2xl">
          追踪我们的最新更新和改进
        </p>
        <motion.a
          href="#changelog"
          className="text-sm z-50 hover:scale-110 transition-transform bg-primary text-primary-foreground rounded-full px-6 py-3 cursor-pointer font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          查看更新日志
        </motion.a>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            alt="Floating decoration"
            className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            alt="Floating decoration"
            className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            alt="Floating decoration"
            className="w-28 h-40 md:w-40 md:h-52 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            alt="Floating decoration"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            alt="Floating decoration"
            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            alt="Floating decoration"
            className="w-28 h-28 md:w-36 md:h-48 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            alt="Floating decoration"
            className="w-40 md:w-52 h-full object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            alt="Floating decoration"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

