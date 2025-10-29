"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Floating, { FloatingElement } from "@/components/parallax-floating"

// 游泳图片 - 使用本地图片（所有图片）
const swimmingImages = [
  "/swimming_images/C2_00010.jpeg",
  "/swimming_images/C2_00386.jpeg",
  "/swimming_images/C2_00872.jpeg",
  "/swimming_images/C2_01005.jpeg",
  "/swimming_images/C2_02915.jpeg",
  "/swimming_images/C2_04845.jpeg",
  "/swimming_images/C2_05476.jpeg",
  "/swimming_images/C2_08095.jpeg",
  "/swimming_images/C2_08140.jpeg",
  "/swimming_images/C2_08165.jpeg",
  "/swimming_images/C2_08171.jpeg",
  "/swimming_images/C2_09174.jpeg",
  "/swimming_images/C2_09366.jpeg",
  "/swimming_images/C2_09529.jpeg",
  "/swimming_images/C2_09711.jpeg",
  "/swimming_images/C2_09832.jpeg",
  "/swimming_images/C2_09844.jpeg",
  "/swimming_images/C2_09855.jpeg",
  "/swimming_images/C2_09881 (1).jpeg",
  "/swimming_images/C2_09881.jpeg",
  "/swimming_images/C2_09896.jpeg",
  "/swimming_images/DSC00118.jpeg",
  "/swimming_images/DSC01337.jpeg",
  "/swimming_images/DSC_5780.jpeg",
  "/swimming_images/DSC_8537.jpeg",
  "/swimming_images/DSC_9877.jpeg",
  "/swimming_images/Eswim_Joe Xu_6504.jpeg",
  "/swimming_images/F83A90C2-2FE8-4243-8255-EBFBE40DDFCB.jpeg",
  "/swimming_images/IMG_0321.jpeg",
  "/swimming_images/IMG_0362.jpeg",
  "/swimming_images/IMG_0870.jpeg",
  "/swimming_images/IMG_0871.jpeg",
  "/swimming_images/IMG_1636.jpeg",
  "/swimming_images/IMG_4429.jpeg",
  "/swimming_images/IMG_5178.jpeg",
  "/swimming_images/IMG_6501.jpeg",
  "/swimming_images/IMG_6513.jpeg",
  "/swimming_images/IMG_6514.jpeg",
  "/swimming_images/IMG_7340.jpeg",
  "/swimming_images/IMG_9262.jpeg",
  "/swimming_images/IMG_9579.jpeg",
  "/swimming_images/IMG_9841.jpeg",
  "/swimming_images/Snapshot 04-02-2025 01:06.jpeg",
  "/swimming_images/Snapshot 04-02-2025 01:09.jpeg",
  "/swimming_images/Snapshot 04-02-2025 01:14.jpeg",
  "/swimming_images/a90fd93d6ic89ca87c28879632392f63.jpeg",
  "/swimming_images/b9c50f49an87205b4b2078e770ddacfb.jpeg",
]

// 为每张图片生成随机位置和样式配置
const generateImageConfigs = () => {
  // 先随机打乱所有图片
  const shuffled = [...swimmingImages].sort(() => Math.random() - 0.5)
  // 只取前 15 张
  const selectedImages = shuffled.slice(0, 15)
  
  return selectedImages.map((image, index) => {
    // 生成随机位置，避免中心区域（40-60%）
    let top, left
    do {
      top = Math.random() * 90 // 0-90%
      left = Math.random() * 90 // 0-90%
    } while (
      top > 35 && top < 65 && // 避免垂直中心
      left > 35 && left < 65    // 避免水平中心
    )

    // 随机深度 (0.5 到 4)
    const depth = 0.5 + Math.random() * 3.5

    // 随机大小（只定宽度，高度自适应保持原始比例）
    const sizeOptions = [
      "w-20 h-auto md:w-32 md:h-auto",      // 小
      "w-32 h-auto md:w-40 md:h-auto",      // 中
      "w-40 h-auto md:w-52 md:h-auto",      // 大
    ]
    const sizeClass = sizeOptions[Math.floor(Math.random() * sizeOptions.length)]

    return {
      image,
      top: `${top}%`,
      left: `${left}%`,
      depth,
      sizeClass,
      index,
    }
  })
}

export default function Hero() {
  const [scope, animate] = useAnimate()
  const imageConfigs = generateImageConfigs()

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.05) } // 减少延迟，因为图片多了
    )
  }, [animate])

  return (
    <div className="w-full py-10">
      <div
        className="relative w-[80%] mx-auto h-[80vh] flex justify-center items-center bg-gradient-to-b from-background to-background/50 overflow-hidden rounded-lg"
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
        {/* 动态生成所有 47 张图片 */}
        {imageConfigs.map((config) => (
          <FloatingElement
            key={config.index}
            depth={config.depth}
            style={{ top: config.top, left: config.left }}
          >
            <motion.img
              initial={{ opacity: 0 }}
              src={config.image}
              alt="Swimming photo"
              className={`${config.sizeClass} object-cover rounded-lg hover:scale-105 duration-200 cursor-pointer transition-transform shadow-lg`}
            />
          </FloatingElement>
        ))}
      </Floating>
      </div>
    </div>
  )
}

