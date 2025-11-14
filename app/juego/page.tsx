"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSavedGame, saveGame, type SavedGame } from "@/lib/game-storage"
import gameData from "@/lib/game-data.json"
import StatsBar from "@/components/stats-bar"
import GovernmentComparison from "@/components/government-comparison"

type GameNode = {
  id: string
  text: string
  background: string
  choices?: Array<{
    text: string
    next: string
    effects: {
      popularidad: number
      derechos: number
      economia: number
      estabilidad: number
    }
  }>
  endings?: Array<{
    condition: string
    result: string
    background: string
  }>
}

export default function JuegoPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gameId = (searchParams?.get("id") as string) || ""

  const [gameState, setGameState] = useState<SavedGame | null>(null)
  const [currentNode, setCurrentNode] = useState<GameNode | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showEnding, setShowEnding] = useState(false)
  const [endingText, setEndingText] = useState("")
  const [endingBackground, setEndingBackground] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [endingImageError, setEndingImageError] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [gameId])

  useEffect(() => {
    setImageError(false)
  }, [currentNode])

  const initializeGame = () => {
    let game = getSavedGame(gameId)

    if (!game) {
      const paisParam = searchParams.get("pais")
      const liderParam = searchParams.get("lider")

      if (paisParam && liderParam && gameId) {
        game = {
          id: gameId,
          pais: paisParam,
          lider: liderParam,
          currentNode: "inicio",
          stats: {
            popularidad: 0,
            derechos: 0,
            economia: 0,
            estabilidad: 0,
          },
          timestamp: Date.now(),
        }
        saveGame(game)
      } else {
        router.push("/partidas")
        return
      }
    }

    setGameState(game)
    loadNode(game.currentNode, game)
  }

  const loadNode = (nodeId: string, state: SavedGame) => {
    const node = (gameData as any)[nodeId] as GameNode

    if (nodeId === "final") {
      evaluateFinalEnding(state)
      return
    }

    if (node) {
      const processedNode = {
        ...node,
        text: replaceVariables(node.text, state),
      }
      setCurrentNode(processedNode)
    }
  }

  const replaceVariables = (text: string, state: SavedGame) => {
    return text.replaceAll("{pais}", state.pais).replaceAll("{lider}", state.lider)
  }

  const evaluateFinalEnding = (state: SavedGame) => {
    const finalNode = (gameData as any)["final"] as GameNode

    if (finalNode.endings) {
      for (const ending of finalNode.endings) {
        if (evaluateCondition(ending.condition, state.stats)) {
          setEndingText(replaceVariables(ending.result, state))
          setEndingBackground(ending.background)
          setShowEnding(true)
          return
        }
      }
    }
  }

  const evaluateCondition = (condition: string, stats: SavedGame["stats"]): boolean => {
    if (condition === "true") return true

    try {
      const evalCondition = condition
        .replaceAll("derechos", stats.derechos.toString())
        .replaceAll("economia", stats.economia.toString())
        .replaceAll("popularidad", stats.popularidad.toString())
        .replaceAll("estabilidad", stats.estabilidad.toString())

      return eval(evalCondition)
    } catch {
      return false
    }
  }

  const handleChoice = async (choice: any) => {
    if (!gameState || !currentNode) return

    setIsTransitioning(true)

    const newStats = {
      popularidad: gameState.stats.popularidad + choice.effects.popularidad,
      derechos: gameState.stats.derechos + choice.effects.derechos,
      economia: gameState.stats.economia + choice.effects.economia,
      estabilidad: gameState.stats.estabilidad + choice.effects.estabilidad,
    }

    const updatedGame: SavedGame = {
      ...gameState,
      currentNode: choice.next,
      stats: newStats,
      timestamp: Date.now(),
    }

    saveGame(updatedGame)
    setGameState(updatedGame)

    await new Promise((resolve) => setTimeout(resolve, 600))

    loadNode(choice.next, updatedGame)
    setIsTransitioning(false)
  }

  const handleRestart = () => {
    router.push("/partidas")
  }

  if (!gameState || !currentNode) {
    if (showEnding) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-retro-black p-4 pixel-perfect">
          <div className="ending-screen max-w-3xl w-full">
            {!endingImageError ? (
              <div
                className="w-full aspect-video mb-6 border-4 border-retro-yellow pixel-perfect"
                style={{
                  backgroundImage: `url(/assets/${endingBackground})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  imageRendering: "pixelated",
                  boxShadow: "8px 8px 0 var(--retro-purple)",
                }}
              >
                <img
                  src={`/assets/${endingBackground}`}
                  alt=""
                  className="hidden"
                  onError={() => setEndingImageError(true)}
                />
              </div>
            ) : (
              <div
                className="w-full aspect-video mb-6 border-4 border-retro-yellow pixel-perfect flex items-center justify-center bg-retro-dark"
                style={{
                  boxShadow: "8px 8px 0 var(--retro-purple)",
                }}
              >
                <div className="text-center">
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🖼️</div>
                  <p
                    className="text-retro-light"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}
                  >
                    NO IMAGE
                  </p>
                </div>
              </div>
            )}
            <h2 className="ending-title">FIN DEL MANDATO</h2>
            <p
              className="text-retro-light mb-8 leading-relaxed"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
            >
              {endingText}
            </p>
            {gameState && (gameData as any).final?.colombianComparison && (
              <GovernmentComparison
                playerStats={gameState.stats}
                presidents={(gameData as any).final.colombianComparison.presidents}
                lider={gameState.lider}
              />
            )}
            <button onClick={handleRestart} className="retro-btn mt-6">
              VOLVER AL MENU
            </button>
          </div>
        </div>
      )
    }
    return null
  }

  if (showEnding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-retro-black p-4 pixel-perfect">
        <div className="ending-screen max-w-3xl w-full">
          {!endingImageError ? (
            <div
              className="w-full aspect-video mb-6 border-4 border-retro-yellow pixel-perfect"
              style={{
                backgroundImage: `url(/assets/${endingBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
                boxShadow: "8px 8px 0 var(--retro-purple)",
              }}
            >
              <img
                src={`/assets/${endingBackground}`}
                alt=""
                className="hidden"
                onError={() => setEndingImageError(true)}
              />
            </div>
          ) : (
            <div
              className="w-full aspect-video mb-6 border-4 border-retro-yellow pixel-perfect flex items-center justify-center bg-retro-dark"
              style={{
                boxShadow: "8px 8px 0 var(--retro-purple)",
              }}
            >
              <div className="text-center">
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🖼️</div>
                <p className="text-retro-light" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}>
                  NO IMAGE
                </p>
              </div>
            </div>
          )}
          <h2 className="ending-title">FIN DEL MANDATO</h2>
          <p
            className="text-retro-light mb-8 leading-relaxed"
            style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
          >
            {endingText}
          </p>
          {gameState && (gameData as any).final?.colombianComparison && (
            <GovernmentComparison
              playerStats={gameState.stats}
              presidents={(gameData as any).final.colombianComparison.presidents}
              lider={gameState.lider}
            />
          )}
          <button onClick={handleRestart} className="retro-btn mt-6">
            VOLVER AL MENU
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-retro-black pixel-perfect">
      <StatsBar stats={gameState.stats} pais={gameState.pais} />

      <div className="min-h-screen flex items-center justify-center p-4 pt-24 pb-8">
        <div className="game-bg">
          {!imageError ? (
            <>
              <div
                className={`node-image transition-opacity duration-600 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(/assets/${currentNode.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <img
                src={`/assets/${currentNode.background}`}
                alt=""
                className="hidden"
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div
              className={`node-image transition-opacity duration-600 ${isTransitioning ? "opacity-0" : "opacity-100"} flex items-center justify-center bg-retro-dark`}
            >
              <div className="text-center">
                <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>🖼️</div>
                <p className="text-retro-light" style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}>
                  NO IMAGE
                </p>
              </div>
            </div>
          )}

          <div className="text-box">
            <p
              className="mb-6 leading-relaxed"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem", lineHeight: "1.8" }}
            >
              {currentNode.text}
            </p>

            <div className="space-y-3">
              {currentNode.choices?.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  disabled={isTransitioning}
                  className="choice-btn disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem", lineHeight: "1.6" }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
            <button
              onClick={() => router.push("/partidas")}
              className="bg-retro-dark/90 text-retro-white border-2 border-retro-purple px-3 py-2 hover:bg-retro-purple transition-all flex items-center gap-2"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}
            >
              ←
              SALIR
            </button>

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="bg-retro-dark/90 text-retro-white border-2 border-retro-purple px-3 py-2 hover:bg-retro-purple transition-all flex items-center gap-2"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem" }}
            >
              ⚙️ OPCIONES
            </button>
          </div>

          {showOptions && (
            <div className="absolute inset-0 bg-retro-black/80 flex items-center justify-center z-30 p-4">
              <div
                className="bg-retro-dark border-4 border-retro-yellow p-6 max-w-md w-full"
                style={{ boxShadow: "12px 12px 0 var(--retro-purple)" }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className="text-retro-yellow"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.85rem" }}
                  >
                    OPCIONES
                  </h2>
                  <button onClick={() => setShowOptions(false)} className="text-retro-white hover:text-retro-red">
                    ✕
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  <p
                    className="text-retro-light"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                  >
                    PAIS: {gameState.pais}
                  </p>
                  <p
                    className="text-retro-light"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.6rem" }}
                  >
                    LIDER: {gameState.lider}
                  </p>
                </div>
                <button onClick={() => router.push("/partidas")} className="retro-btn w-full">
                  MENU PRINCIPAL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
