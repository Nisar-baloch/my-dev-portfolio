"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, MousePointer2 } from "lucide-react"

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScratched, setIsScratched] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  const initCanvas = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas resolution to match display size
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Fill with a nice gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#1e293b") // slate-800
    gradient.addColorStop(1, "#334155") // slate-700
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some pattern or text on top
    ctx.font = "14px Inter, sans-serif"
    ctx.fillStyle = "#94a3b8" // slate-400
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Scratch Me", canvas.width / 2, canvas.height / 2)

    setIsScratched(false)
  }

  useEffect(() => {
    initCanvas()
    window.addEventListener("resize", initCanvas)
    return () => window.removeEventListener("resize", initCanvas)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true)
    scratch(e)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return
    scratch(e)
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
    checkScratched()
  }

  const scratch = (e: React.PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkScratched = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++
      }
    }

    const totalPixels = pixels.length / 4
    const percentScratched = (transparentPixels / totalPixels) * 100

    if (percentScratched > 40) {
      setIsScratched(true)
      // Clear entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <div className="bento-card col-span-1 row-span-1 md:row-span-2 h-48 md:h-auto flex flex-col relative group">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <MousePointer2 size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Scratch Me</span>
      </div>

      {isScratched && (
        <button 
          onClick={initCanvas}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
          aria-label="Reset scratch card"
        >
          <RefreshCw size={14} />
        </button>
      )}

      <div ref={containerRef} className="absolute inset-0 z-10 touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`w-full h-full cursor-crosshair transition-opacity duration-500 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        />
      </div>

      {/* Underlying content */}
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-accent/5">
        <p className="text-center font-display text-xl sm:text-2xl text-accent select-none">
          &quot;Always building something new.&quot;
        </p>
      </div>
    </div>
  )
}
