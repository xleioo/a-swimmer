"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrambleHoverProps {
  text: string
  scrambleSpeed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: "start" | "end" | "center"
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  scrambledClassName?: string
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className,
  scrambledClassName,
  sequential = false,
  revealDirection = "start",
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>())

  useEffect(() => {
    let interval: NodeJS.Timeout
    let currentIteration = 0

    const getNextIndex = (currentRevealedIndices: Set<number>) => {
      const textLength = text.length
      switch (revealDirection) {
        case "start":
          return currentRevealedIndices.size
        case "end":
          return textLength - 1 - currentRevealedIndices.size
        case "center":
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(currentRevealedIndices.size / 2)
          const nextIndex =
            currentRevealedIndices.size % 2 === 0
              ? middle + offset
              : middle - offset - 1

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !currentRevealedIndices.has(nextIndex)
          ) {
            return nextIndex
          }

          for (let i = 0; i < textLength; i++) {
            if (!currentRevealedIndices.has(i)) return i
          }
          return 0
        default:
          return currentRevealedIndices.size
      }
    }

    const shuffleText = (text: string, currentRevealedIndices: Set<number>) => {
      if (useOriginalCharsOnly) {
        const positions = text.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealedIndices.has(i),
        }))

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char)

        // Shuffle remaining non-revealed, non-space characters
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return " "
            if (p.isRevealed) return text[p.index]
            return nonSpaceChars[charIndex++]
          })
          .join("")
      } else {
        const availableChars = useOriginalCharsOnly
          ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
          : characters.split("")
        return text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (currentRevealedIndices.has(i)) return text[i]
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ]
          })
          .join("")
      }
    }

    if (isHovering) {
      setIsScrambling(true)
      if (sequential) {
        const localRevealedIndices = new Set<number>()
        interval = setInterval(() => {
          if (localRevealedIndices.size < text.length) {
            const nextIndex = getNextIndex(localRevealedIndices)
            localRevealedIndices.add(nextIndex)
            setRevealedIndices(new Set(localRevealedIndices))
            setDisplayText(shuffleText(text, localRevealedIndices))
          } else {
            clearInterval(interval)
            setIsScrambling(false)
          }
        }, scrambleSpeed)
      } else {
        interval = setInterval(() => {
          setDisplayText(shuffleText(text, new Set<number>()))
          currentIteration++
          if (currentIteration >= maxIterations) {
            clearInterval(interval)
            setIsScrambling(false)
            setDisplayText(text)
          }
        }, scrambleSpeed)
      }
    } else {
      setDisplayText(text)
      setRevealedIndices(new Set<number>())
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [
    isHovering,
    text,
    characters,
    scrambleSpeed,
    useOriginalCharsOnly,
    sequential,
    revealDirection,
    maxIterations,
  ])

  return (
    <motion.span
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cn("inline-block whitespace-pre-wrap", className)}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => (
          <span
            key={index}
            className={cn(
              revealedIndices.has(index) || !isScrambling || !isHovering
                ? className
                : scrambledClassName
            )}
          >
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  )
}

export default ScrambleHover

