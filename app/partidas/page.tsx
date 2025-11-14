"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Play, Plus, ArrowLeft } from "lucide-react"
import { getSavedGames, deleteSavedGame, type SavedGame } from "@/lib/game-storage"

export default function PartidasPage() {
  const router = useRouter()
  const [savedGames, setSavedGames] = useState<SavedGame[]>([])
  const [isNewGameOpen, setIsNewGameOpen] = useState(false)
  const [pais, setPais] = useState("")
  const [lider, setLider] = useState("")

  useEffect(() => {
    loadSavedGames()
  }, [])

  const loadSavedGames = () => {
    setSavedGames(getSavedGames())
  }

  const handleDeleteGame = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta partida?")) {
      deleteSavedGame(id)
      loadSavedGames()
    }
  }

  const handleNewGame = () => {
    if (pais.trim() && lider.trim()) {
      const gameId = Date.now().toString()
      router.push(`/juego/${gameId}?pais=${encodeURIComponent(pais)}&lider=${encodeURIComponent(lider)}`)
      setIsNewGameOpen(false)
      setPais("")
      setLider("")
    }
  }

  const getProgress = (currentNode: string) => {
    const nodes = [
      "inicio",
      "gabinete",
      "presupuesto",
      "medios",
      "crisis_social",
      "reformas",
      "elecciones_2do_periodo",
      "campana_reeleccion",
      "resultados_reeleccion",
      "evaluacion_final",
      "final",
    ]
    const index = nodes.indexOf(currentNode)
    return index >= 0 ? Math.round((index / (nodes.length - 1)) * 100) : 0
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
            <ArrowLeft className="h-3 w-3" />
            VOLVER
          </button>

          <h1
            className="text-2xl md:text-3xl font-bold text-retro-yellow"
            style={{ fontFamily: "Press Start 2P, monospace", textShadow: "4px 4px 0 var(--retro-red)" }}
          >
            PARTIDAS
          </h1>

          <div className="w-32" />
        </div>

        {/* New Game Section */}
        {!isNewGameOpen ? (
          <button
            onClick={() => setIsNewGameOpen(true)}
            className="retro-btn w-full mb-6 flex items-center justify-center gap-3"
          >
            <Plus className="h-4 w-4" />
            NUEVA PARTIDA
          </button>
        ) : (
          <div
            className="bg-retro-dark border-4 border-retro-purple p-6 mb-6"
            style={{ boxShadow: "8px 8px 0 var(--retro-purple)" }}
          >
            <h2
              className="text-retro-yellow mb-6 text-center"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.85rem" }}
            >
              CREAR PARTIDA
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="pais"
                  className="block text-retro-light mb-2"
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                >
                  NOMBRE DEL PAIS
                </label>
                <input
                  id="pais"
                  type="text"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  placeholder="Ej: Libertad"
                  className="retro-input"
                  maxLength={20}
                />
              </div>
              <div>
                <label
                  htmlFor="lider"
                  className="block text-retro-light mb-2"
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                >
                  NOMBRE DEL LIDER
                </label>
                <input
                  id="lider"
                  type="text"
                  value={lider}
                  onChange={(e) => setLider(e.target.value)}
                  placeholder="Ej: Maria G."
                  className="retro-input"
                  maxLength={20}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleNewGame}
                  disabled={!pais.trim() || !lider.trim()}
                  className="retro-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  COMENZAR
                </button>
                <button onClick={() => setIsNewGameOpen(false)} className="retro-btn-secondary">
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Saved Games List */}
        <div className="space-y-4">
          {savedGames.length === 0 ? (
            <div
              className="bg-retro-dark border-4 border-retro-purple p-8 text-center"
              style={{ boxShadow: "8px 8px 0 var(--retro-purple)" }}
            >
              <p
                className="text-retro-gray"
                style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
              >
                NO HAY PARTIDAS GUARDADAS
              </p>
            </div>
          ) : (
            savedGames.map((game) => (
              <div
                key={game.id}
                className="bg-retro-dark border-4 border-retro-blue p-6 hover:border-retro-yellow transition-colors"
                style={{ boxShadow: "8px 8px 0 var(--retro-blue)" }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-retro-yellow mb-2"
                      style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.85rem" }}
                    >
                      {game.pais}
                    </h3>
                    <p
                      className="text-retro-light mb-4"
                      style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                    >
                      LIDER: {game.lider}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-retro-black border-2 border-retro-red p-2">
                        <p className="text-retro-gray" style={{ fontSize: "0.5rem" }}>
                          POP
                        </p>
                        <p className="text-retro-red font-bold" style={{ fontSize: "0.75rem" }}>
                          {game.stats.popularidad > 0 ? "+" : ""}
                          {game.stats.popularidad}
                        </p>
                      </div>
                      <div className="bg-retro-black border-2 border-retro-blue p-2">
                        <p className="text-retro-gray" style={{ fontSize: "0.5rem" }}>
                          DER
                        </p>
                        <p className="text-retro-blue font-bold" style={{ fontSize: "0.75rem" }}>
                          {game.stats.derechos > 0 ? "+" : ""}
                          {game.stats.derechos}
                        </p>
                      </div>
                      <div className="bg-retro-black border-2 border-retro-green p-2">
                        <p className="text-retro-gray" style={{ fontSize: "0.5rem" }}>
                          ECO
                        </p>
                        <p className="text-retro-green font-bold" style={{ fontSize: "0.75rem" }}>
                          {game.stats.economia > 0 ? "+" : ""}
                          {game.stats.economia}
                        </p>
                      </div>
                      <div className="bg-retro-black border-2 border-retro-yellow p-2">
                        <p className="text-retro-gray" style={{ fontSize: "0.5rem" }}>
                          EST
                        </p>
                        <p className="text-retro-yellow font-bold" style={{ fontSize: "0.75rem" }}>
                          {game.stats.estabilidad > 0 ? "+" : ""}
                          {game.stats.estabilidad}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-retro-black border-2 border-retro-purple h-4">
                        <div
                          className="bg-retro-green h-full transition-all pixel-perfect"
                          style={{ width: `${getProgress(game.currentNode)}%`, imageRendering: "pixelated" }}
                        />
                      </div>
                      <span className="text-retro-light" style={{ fontSize: "0.6rem" }}>
                        {getProgress(game.currentNode)}%
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/juego/${game.id}`)}
                      className="retro-btn flex-1 flex items-center justify-center gap-2"
                    >
                      <Play className="h-3 w-3" />
                      CONTINUAR
                    </button>
                    <button
                      onClick={() => handleDeleteGame(game.id)}
                      className="bg-retro-red text-retro-white border-4 border-retro-dark px-4 py-4 font-bold hover:bg-retro-orange transition-all"
                      style={{
                        fontFamily: "Press Start 2P, monospace",
                        fontSize: "0.75rem",
                        boxShadow: "6px 6px 0 var(--retro-dark)",
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
