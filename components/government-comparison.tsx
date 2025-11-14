"use client"

import { type SavedGame } from "@/lib/game-storage"

type President = {
  name: string
  years: string
  derechos: number
  economia: number
  estabilidad: number
  popularidad: number
  description: string
}

interface GovernmentComparisonProps {
  readonly playerStats: SavedGame["stats"]
  readonly presidents: President[]
  readonly lider: string
}

const calculateScore = (stats: Record<string, number>): number => {
  return Math.round(
    ((stats.derechos + 10) * 0.25 +
      (stats.economia + 10) * 0.25 +
      (stats.estabilidad + 10) * 0.25 +
      (stats.popularidad + 10) * 0.25) /
      4
  )
}

const getAnalysisText = (playerScore: number, lider: string): string => {
  if (playerScore > 20) {
    return `${lider} demostró ser un líder excepcional, comparable con los mejores presidentes colombianos.`
  }
  if (playerScore > 15) {
    return `${lider} realizó una gestión destacada, equilibrando diferentes aspectos del gobierno.`
  }
  if (playerScore > 10) {
    return `${lider} tuvo una gestión moderada, con aciertos y desafíos en su mandato.`
  }
  return `${lider} enfrentó muchos desafíos durante su gobierno, dejando un legado complejo.`
}

export default function GovernmentComparison({
  playerStats,
  presidents,
  lider,
}: GovernmentComparisonProps) {
  const playerScore = calculateScore(playerStats)
  const comparisons = presidents.map((president) => ({
    ...president,
    score: calculateScore({
      derechos: president.derechos,
      economia: president.economia,
      estabilidad: president.estabilidad,
      popularidad: president.popularidad,
    }),
  }))

  const sortedComparisons = [...comparisons].sort((a, b) => b.score - a.score)

  return (
    <div className="comparison-container mt-8 pt-8 border-t-4 border-retro-yellow">
      <h3
        className="text-retro-yellow mb-6 text-center"
        style={{
          fontFamily: "Press Start 2P, monospace",
          fontSize: "1rem",
          textShadow: "2px 2px 0 var(--retro-red)",
        }}
      >
        COMPARACIÓN CON PRESIDENTES COLOMBIANOS
      </h3>

      {/* Player Stats */}
      <div
        className="bg-retro-dark border-2 border-retro-yellow p-4 mb-6"
        style={{ boxShadow: "4px 4px 0 var(--retro-purple)" }}
      >
        <p
          className="text-retro-yellow mb-4"
          style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.8rem" }}
        >
          {lider.toUpperCase()}
        </p>

        <div className="space-y-3 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-retro-light" style={{ fontSize: "0.65rem" }}>
                DERECHOS: {playerStats.derechos > 0 ? "+" : ""}
                {playerStats.derechos}
              </span>
            </div>
            <div className="w-full bg-retro-dark border border-retro-purple">
              <div
                className="h-2 bg-retro-yellow transition-all"
                style={{
                  width: `${((Math.max(-10, Math.min(10, playerStats.derechos)) + 10) / 20) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-retro-light" style={{ fontSize: "0.65rem" }}>
                ECONOMÍA: {playerStats.economia > 0 ? "+" : ""}
                {playerStats.economia}
              </span>
            </div>
            <div className="w-full bg-retro-dark border border-retro-purple">
              <div
                className="h-2 bg-retro-yellow transition-all"
                style={{
                  width: `${((Math.max(-10, Math.min(10, playerStats.economia)) + 10) / 20) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-retro-light" style={{ fontSize: "0.65rem" }}>
                ESTABILIDAD: {playerStats.estabilidad > 0 ? "+" : ""}
                {playerStats.estabilidad}
              </span>
            </div>
            <div className="w-full bg-retro-dark border border-retro-purple">
              <div
                className="h-2 bg-retro-yellow transition-all"
                style={{
                  width: `${((Math.max(-10, Math.min(10, playerStats.estabilidad)) + 10) / 20) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-retro-light" style={{ fontSize: "0.65rem" }}>
                POPULARIDAD: {playerStats.popularidad > 0 ? "+" : ""}
                {playerStats.popularidad}
              </span>
            </div>
            <div className="w-full bg-retro-dark border border-retro-purple">
              <div
                className="h-2 bg-retro-yellow transition-all"
                style={{
                  width: `${((Math.max(-10, Math.min(10, playerStats.popularidad)) + 10) / 20) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-retro-purple">
            <div className="flex justify-between items-center">
              <span className="text-retro-purple font-bold" style={{ fontSize: "0.75rem" }}>
                PUNTUACIÓN TOTAL:
              </span>
              <span className="text-retro-yellow font-bold" style={{ fontSize: "0.85rem" }}>
                {playerScore}/25
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="mb-6">
        <p
          className="text-retro-light mb-3"
          style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.75rem" }}
        >
          RANKING HISTÓRICO
        </p>

        <div className="space-y-2">
          {sortedComparisons.map((president, index) => (
            <div
              key={`${president.name}-${president.years}`}
              className={`border-2 p-3 ${
                president.name === "Tu Mandato" ? "border-retro-yellow bg-retro-dark/50" : "border-retro-purple"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-retro-light"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.7rem" }}
                  >
                    #{index + 1}. {president.name} ({president.years})
                  </p>
                  <p
                    className="text-retro-light/70 mt-1"
                    style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.5rem", lineHeight: "1.4" }}
                  >
                    {president.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-retro-yellow font-bold" style={{ fontSize: "0.75rem" }}>
                    {president.score}/25
                  </p>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                    DER:
                  </span>
                  <span
                    className={president.derechos > 0 ? "text-retro-yellow" : "text-retro-red"}
                    style={{ fontSize: "0.45rem" }}
                  >
                    {president.derechos > 0 ? "+" : ""}
                    {president.derechos}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                    ECO:
                  </span>
                  <span
                    className={president.economia > 0 ? "text-retro-yellow" : "text-retro-red"}
                    style={{ fontSize: "0.45rem" }}
                  >
                    {president.economia > 0 ? "+" : ""}
                    {president.economia}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                    EST:
                  </span>
                  <span
                    className={president.estabilidad > 0 ? "text-retro-yellow" : "text-retro-red"}
                    style={{ fontSize: "0.45rem" }}
                  >
                    {president.estabilidad > 0 ? "+" : ""}
                    {president.estabilidad}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-retro-light" style={{ fontSize: "0.4rem" }}>
                    POP:
                  </span>
                  <span
                    className={president.popularidad > 0 ? "text-retro-yellow" : "text-retro-red"}
                    style={{ fontSize: "0.45rem" }}
                  >
                    {president.popularidad > 0 ? "+" : ""}
                    {president.popularidad}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis */}
      <div
        className="bg-retro-dark border-2 border-retro-purple p-4"
        style={{ boxShadow: "4px 4px 0 var(--retro-yellow)" }}
      >
        <p
          className="text-retro-light"
          style={{
            fontFamily: "Press Start 2P, monospace",
            fontSize: "0.5rem",
            lineHeight: "1.8",
          }}
        >
          {getAnalysisText(playerScore, lider)}
        </p>
      </div>
    </div>
  )
}
