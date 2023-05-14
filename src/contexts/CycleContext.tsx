import { ReactNode, createContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondPassed: (seconds: number) => void
  setActiveCycleIdNull: () => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  // Armazena todos os ciclos
  const [cycles, setCycles] = useState<Cycle[]>([])
  // Armazena o clico atual que esta sendo executado
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // Verifica e retorna todos os valores do ciclo ativo
  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)
  // Armazena quando segundos se passaram desde o inicio do ciclo atual
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function setActiveCycleIdNull() {
    setActiveCycleId(null)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // pega o valor anterior na variável 'state'
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondPassed,
        setActiveCycleIdNull,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
