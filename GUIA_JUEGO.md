# Guía del Juego - Political Simulation Game

## Flujo de Juego Expandido

```
INICIO
  ├─ NUEVA PARTIDA
  ├─ CARGAR PARTIDA
  ├─ HISTORIAS (NUEVO)
  ├─ ESTADÍSTICAS (NUEVO)
  └─ SALIR
```

## Árbol de Decisiones del Juego

```
Inicio
  ├─ (Elección sobre promesas)
  ├─ Gabinete
  │   └─ (Elección sobre ministros)
  ├─ Presupuesto
  │   └─ (Elección sobre distribución)
  ├─ Medios
  │   └─ (Elección sobre libertad de prensa)
  ├─ Crisis Social
  │   └─ (Elección sobre respuesta)
  ├─ Reformas
  │   └─ (Elección sobre tipo de reformas)
  ├─ Elecciones 2do Período (NUEVO)
  │   └─ (Buscar reelección o retirarse)
  │       ├─ Campaña Reelección (NUEVO)
  │       │   └─ (Estrategia de campaña)
  │       │       └─ Resultados Reelección (NUEVO)
  │       │           └─ Evaluación Final
  │       │               └─ FIN
  │       └─ [Si se retira]
  │           └─ Evaluación Final
  │               └─ FIN
  └─ Evaluación Final (modificado para agregar nodos)
      └─ FIN CON COMPARACIÓN COLOMBIANA
```

## Estadísticas de Juego

### Métricas Rastreadas
- **Derechos**: Protección de derechos humanos y libertades
- **Economía**: Crecimiento económico y empleo
- **Estabilidad**: Orden público y seguridad
- **Popularidad**: Apoyo ciudadano

### Rango de Valores
- Mínimo: -10
- Máximo: +10
- Scoring Final: 0-25 puntos

## Presidentes Colombianos en la Comparación

| Presidente | Años | Derechos | Economía | Estabilidad | Popularidad |
|-----------|------|----------|----------|-------------|-------------|
| Álvaro Uribe | 2002-2010 | -3 | 4 | 5 | 6 |
| Juan Manuel Santos | 2010-2018 | 4 | 2 | 3 | 4 |
| Iván Duque | 2018-2022 | 1 | 1 | 2 | 2 |
| Gustavo Petro | 2022-presente | 3 | -1 | -1 | 3 |
| Andrés Pastrana | 1998-2002 | 1 | -2 | 1 | 2 |

## Nuevas Páginas

### 1. Historias (`/historias`)
- **Función**: Ver todas las partidas completadas
- **Información**: Líder, País, Puntuación Total, Fecha
- **Estadísticas Mostradas**: Derechos, Economía, Estabilidad, Popularidad
- **Orden**: Más recientes primero

### 2. Estadísticas (`/estadisticas`)
- **Función**: Ver análisis de todas las partidas
- **Resumen General**:
  - Total de partidas jugadas
  - Partidas completadas
  - Mejor partida
- **Promedios**: Estadísticas promedio acumuladas
- **Gráficos**: Barras de progreso visuales

## Cómo Jugar

### Paso 1: Seleccionar Opción
1. Ir a NUEVA PARTIDA
2. Ingresar nombre del país
3. Ingresar nombre del líder

### Paso 2: Tomar Decisiones
- Cada decisión afecta tus estadísticas
- Los efectos pueden ser positivos o negativos
- El progreso se guarda automáticamente

### Paso 3: Finalizar Partida
1. Completar todas las decisiones
2. Ver resultado final personalizado
3. **Compararte con presidentes colombianos reales**
4. Ver ranking histórico

### Paso 4: Analizar Resultados
1. Ir a HISTORIAS para ver partidas completadas
2. Ir a ESTADÍSTICAS para ver promedio general
3. Intentar mejores estrategias

## Sistema de Puntuación

### Fórmula
```
Puntuación = ((Derechos + 10) × 0.25 + (Economía + 10) × 0.25 + 
              (Estabilidad + 10) × 0.25 + (Popularidad + 10) × 0.25) / 4
```

### Rangos de Rendimiento
- **Excepcional (>20)**: "Líder comparable con los mejores presidentes"
- **Destacado (>15)**: "Gestión equilibrada"
- **Moderado (>10)**: "Con aciertos y desafíos"
- **Difícil (<10)**: "Enfrentó muchos desafíos"

## Consejos para Obtener Mejor Puntuación

1. **Enfoque en Derechos**: Defendé la libertad de prensa, dialoga con protestantes
2. **Equilibrio Económico**: No sacrifiques todo por economía o derechos
3. **Estabilidad**: Mantén orden sin autoritarismo
4. **Popularidad**: Las decisiones audaces pueden costar popularidad a corto plazo
5. **Reelección**: Busca reelección si tienes buen desempeño

## Próximas Actualizaciones Planeadas

- Más presidentes históricos
- Sistema de logros
- Leaderboards compartidos
- Más ramificaciones de decisiones
- Impacto más profundo de las elecciones
