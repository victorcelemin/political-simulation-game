"use client"

import { useRouter } from "next/navigation"
import { Crown } from "lucide-react"
import { useState } from "react"
import { StoryIntro } from "@/components/story-intro"

export default function InicioPage() {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-retro-black relative overflow-hidden pixel-perfect">
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            animation: "scanlines 6s linear infinite",
          }}
        />
      </div>

      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
          }}
        />
      </div>

      <div className="relative z-10 menu-card">
        <div className="mb-8 flex justify-center">
          <div className="bg-retro-purple p-6 border-4 border-retro-yellow" style={{ imageRendering: "pixelated" }}>
            <Crown className="w-16 h-16 text-retro-yellow" strokeWidth={3} />
          </div>
        </div>

        <h1 className="menu-title">EL MANDATARIO</h1>

        <p
          className="text-retro-light mb-12 leading-relaxed"
          style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem", lineHeight: "1.8" }}
        >
          Un juego de decisiones políticas donde cada elección define el destino de tu nación
        </p>

        <div className="flex flex-col gap-4">
          <button onClick={() => setShowIntro(true)} className="retro-btn w-full">
            NUEVA PARTIDA
          </button>

          <button onClick={() => router.push("/partidas")} className="retro-btn-secondary w-full">
            CARGAR PARTIDA
          </button>

          <button onClick={() => router.push("/historias")} className="retro-btn-secondary w-full">
            HISTORIAS
          </button>

          <button onClick={() => router.push("/estadisticas")} className="retro-btn-secondary w-full">
            ESTADÍSTICAS
          </button>
          
          {showIntro && (
            <StoryIntro 
              onComplete={() => {
                setShowIntro(false);
                router.push("/partidas");
              }}
            />
          )}
        </div>

        {/* Retro credits */}
        <div className="mt-8 text-retro-gray text-center" style={{ fontSize: "0.5rem" }}>
          <p>PRESS START</p>
        </div>
      </div>
    </div>
  )
}
