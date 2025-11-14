"use client"

import { useRouter } from "next/navigation"
import { getSavedGames, type SavedGame } from "@/lib/game-storage"
import { useEffect, useState } from "react"

interface GameStats {
  totalGames: number
  completedGames: number
  averageStats: {
    derechos: number
    economia: number
    estabilidad: number
    popularidad: number
  }
  bestGame?: SavedGame
}

export default function EstadisticasPage() {
  const router = useRouter()
  const [stats, setStats] = useState<GameStats | null>(null)

  useEffect(() => {
    const games = getSavedGames()
    const completedGames = games.filter((g) => g.currentNode === "final")

    if (games.length > 0) {
      const avgStats = {
        derechos: Math.round(games.reduce((sum, g) => sum + g.stats.derechos, 0) / games.length),
        economia: Math.round(games.reduce((sum, g) => sum + g.stats.economia, 0) / games.length),
        estabilidad: Math.round(games.reduce((sum, g) => sum + g.stats.estabilidad, 0) / games.length),
        popularidad: Math.round(games.reduce((sum, g) => sum + g.stats.popularidad, 0) / games.length),
      }

      const sortedGames = completedGames.sort(
        (a, b) =>
          (a.stats.derechos +
            a.stats.economia +
            a.stats.estabilidad +
            a.stats.popularidad) -
          (b.stats.derechos + b.stats.economia + b.stats.estabilidad + b.stats.popularidad)
      )
      const bestGame = sortedGames[0]

      setStats({
        totalGames: games.length,
        completedGames: completedGames.length,
        averageStats: avgStats,
        bestGame,
      })
    }
  }, [])

  return (
    <div className="bg-retro-black p-4 md:p-8 pixel-perfect relative">
      {/* Scanlines effect - fixed background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="w-full h-full"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            animation: "scanlines 6s linear infinite",
          }}
        />
      </div>
      {/* Ensure full height background */}
      <div className="fixed inset-0 bg-retro-black" style={{ zIndex: -1 }} />

      <div className="max-w-4xl mx-auto relative z-20">
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
            ESTADÍSTICAS
          </h1>

          <button
            onClick={() => router.push("/inicio")}
            className="retro-btn-secondary flex items-center gap-2 invisible"
            style={{ fontSize: "0.6rem" }}
          >
            ← VOLVER
          </button>
        </div>

        {stats ? (
          <div className="space-y-4 md:space-y-6">
            {/* Summary Stats */}
            <div
              className="bg-retro-dark border-4 border-retro-yellow p-4 md:p-6"
              style={{ boxShadow: "6px 6px 0 var(--retro-purple)" }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="text-retro-yellow" style={{ fontSize: "1.2rem" }}>📊</div>
                <h2
                  className="text-retro-yellow"
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                >
                  RESUMEN
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-retro-dark border-2 border-retro-purple p-3">
                  <p className="text-retro-light/70 mb-2" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.4rem" }}>
                    TOTALES
                  </p>
                  <p className="text-retro-yellow text-xl font-bold">{stats.totalGames}</p>
                </div>
                <div className="bg-retro-dark border-2 border-retro-purple p-3">
                  <p className="text-retro-light/70 mb-2" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.4rem" }}>
                    COMPLETADAS
                  </p>
                  <p className="text-retro-yellow text-xl font-bold">{stats.completedGames}</p>
                </div>
              </div>

              {stats.bestGame && (
                <div className="bg-retro-dark border-2 border-retro-red p-3">
                  <p className="text-retro-light/70" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}>
                    MEJOR PARTIDA
                  </p>
                  <p className="text-retro-yellow" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}>
                    {stats.bestGame.lider} en {stats.bestGame.pais}
                  </p>
                </div>
              )}
            </div>

            {/* Average Stats */}
            <div
              className="bg-retro-dark border-4 border-retro-yellow p-4 md:p-6"
              style={{ boxShadow: "6px 6px 0 var(--retro-purple)" }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="text-retro-yellow" style={{ fontSize: "1.2rem" }}>📈</div>
                <h2
                  className="text-retro-yellow"
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                >
                  PROMEDIO
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-light" style={{ fontSize: "0.55rem" }}>
                      DERECHOS
                    </span>
                    <span className="text-retro-yellow font-bold" style={{ fontSize: "0.6rem" }}>
                      {stats.averageStats.derechos}
                    </span>
                  </div>
                  <div className="w-full bg-retro-dark border border-retro-purple">
                    <div
                      className="h-3 bg-retro-yellow"
                      style={{ width: `${((stats.averageStats.derechos + 10) / 20) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-light" style={{ fontSize: "0.55rem" }}>
                      ECONOMÍA
                    </span>
                    <span className="text-retro-yellow font-bold" style={{ fontSize: "0.6rem" }}>
                      {stats.averageStats.economia}
                    </span>
                  </div>
                  <div className="w-full bg-retro-dark border border-retro-purple">
                    <div
                      className="h-3 bg-retro-yellow"
                      style={{ width: `${((stats.averageStats.economia + 10) / 20) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-light" style={{ fontSize: "0.55rem" }}>
                      ESTABILIDAD
                    </span>
                    <span className="text-retro-yellow font-bold" style={{ fontSize: "0.6rem" }}>
                      {stats.averageStats.estabilidad}
                    </span>
                  </div>
                  <div className="w-full bg-retro-dark border border-retro-purple">
                    <div
                      className="h-3 bg-retro-yellow"
                      style={{ width: `${((stats.averageStats.estabilidad + 10) / 20) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-light" style={{ fontSize: "0.55rem" }}>
                      POPULARIDAD
                    </span>
                    <span className="text-retro-yellow font-bold" style={{ fontSize: "0.6rem" }}>
                      {stats.averageStats.popularidad}
                    </span>
                  </div>
                  <div className="w-full bg-retro-dark border border-retro-purple">
                    <div
                      className="h-3 bg-retro-yellow"
                      style={{ width: `${((stats.averageStats.popularidad + 10) / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/inicio")}
              className="retro-btn w-full"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
            >
              VOLVER AL MENU
            </button>
          </div>
        ) : (
          <div
            className="bg-retro-dark border-4 border-retro-yellow p-8 text-center"
            style={{ boxShadow: "8px 8px 0 var(--retro-purple)" }}
          >
            <p
              className="text-retro-light mb-6"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
            >
              NO HAY ESTADÍSTICAS DISPONIBLES AÚN. ¡COMIENZA TU PRIMER JUEGO!
            </p>
            <button
              onClick={() => router.push("/partidas")}
              className="retro-btn w-full"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
            >
              NUEVA PARTIDA
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
