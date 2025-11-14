"use client"

import { useRouter } from "next/navigation"
import { getSavedGames, type SavedGame } from "@/lib/game-storage"
import { useEffect, useState } from "react"

export default function HistoriasPage() {
  const router = useRouter()
  const [completedGames, setCompletedGames] = useState<SavedGame[]>([])

  useEffect(() => {
    const games = getSavedGames()
    const finished = games.filter((g) => g.currentNode === "final")
    setCompletedGames(finished.sort((a, b) => b.timestamp - a.timestamp))
  }, [])

  const getScoreColor = (total: number) => {
    if (total > 20) return "text-retro-yellow"
    if (total > 10) return "text-retro-light"
    return "text-retro-red"
  }

  return (
    <div className="min-h-screen bg-retro-black p-4 md:p-8 pixel-perfect relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            animation: "scanlines 6s linear infinite",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/inicio")}
            className="retro-btn-secondary flex items-center gap-2"
            style={{ fontSize: "0.6rem" }}
          >
            ← VOLVER
          </button>

          <h1
            className="text-xl md:text-2xl font-bold text-retro-yellow text-center"
            style={{ fontFamily: "Press Start 2P, monospace", textShadow: "3px 3px 0 var(--retro-red)" }}
          >
            HISTORIAS
          </h1>

          <button
            onClick={() => router.push("/inicio")}
            className="retro-btn-secondary flex items-center gap-2 invisible"
            style={{ fontSize: "0.6rem" }}
          >
            ← VOLVER
          </button>
        </div>

        {completedGames.length > 0 ? (
          <div className="space-y-2 md:space-y-4">
            {completedGames.map((game: SavedGame) => {
              const totalScore =
                game.stats.derechos +
                game.stats.economia +
                game.stats.estabilidad +
                game.stats.popularidad
              const date = new Date(game.timestamp).toLocaleDateString("es-CO")

              return (
                <div
                  key={game.id}
                  className="bg-retro-dark border-2 border-retro-purple p-3 md:p-4 hover:border-retro-yellow transition-all"
                  style={{ boxShadow: "3px 3px 0 var(--retro-purple)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className="text-retro-yellow mb-1"
                        style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
                      >
                        {game.lider} en {game.pais}
                      </h3>
                      <p
                        className="text-retro-light/70"
                        style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}
                      >
                        {date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
                        {totalScore}
                      </p>
                      <p
                        className="text-retro-light/70"
                        style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.45rem" }}
                      >
                        PUNTOS
                      </p>
                    </div>
                  </div>

                  {/* Stats preview */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="bg-retro-dark/50 border border-retro-purple p-2">
                      <p className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                        DER
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          game.stats.derechos > 0 ? "text-retro-yellow" : "text-retro-red"
                        }`}
                        style={{ fontSize: "0.55rem" }}
                      >
                        {game.stats.derechos > 0 ? "+" : ""}
                        {game.stats.derechos}
                      </p>
                    </div>
                    <div className="bg-retro-dark/50 border border-retro-purple p-2">
                      <p className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                        ECO
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          game.stats.economia > 0 ? "text-retro-yellow" : "text-retro-red"
                        }`}
                        style={{ fontSize: "0.55rem" }}
                      >
                        {game.stats.economia > 0 ? "+" : ""}
                        {game.stats.economia}
                      </p>
                    </div>
                    <div className="bg-retro-dark/50 border border-retro-purple p-2">
                      <p className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                        EST
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          game.stats.estabilidad > 0 ? "text-retro-yellow" : "text-retro-red"
                        }`}
                        style={{ fontSize: "0.55rem" }}
                      >
                        {game.stats.estabilidad > 0 ? "+" : ""}
                        {game.stats.estabilidad}
                      </p>
                    </div>
                    <div className="bg-retro-dark/50 border border-retro-purple p-2">
                      <p className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                        POP
                      </p>
                      <p
                        className={`text-sm font-bold ${
                          game.stats.popularidad > 0 ? "text-retro-yellow" : "text-retro-red"
                        }`}
                        style={{ fontSize: "0.55rem" }}
                      >
                        {game.stats.popularidad > 0 ? "+" : ""}
                        {game.stats.popularidad}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div
            className="bg-retro-dark border-4 border-retro-yellow p-8 text-center"
            style={{ boxShadow: "8px 8px 0 var(--retro-purple)" }}
          >
            <div className="flex justify-center mb-4" style={{ fontSize: "3rem" }}>
              📚
            </div>
            <p
              className="text-retro-light mb-6"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
            >
              AÚN NO HAY HISTORIAS COMPLETADAS. ¡CREA TU PROPIA LEYENDA!
            </p>
            <button
              onClick={() => router.push("/partidas")}
              className="retro-btn w-full"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
            >
              COMENZAR
            </button>
          </div>
        )}

        <button
          onClick={() => router.push("/inicio")}
          className="retro-btn-secondary w-full mt-6 flex items-center justify-center gap-2"
          style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
        >
          ← VOLVER AL MENU
        </button>
      </div>
    </div>
  )
}
