import { ReactNode, createContext, useReducer, useState } from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'

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
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  // Armazena todos os ciclos
  // const [cycles, setCycles] = useState<Cycle[]>([])

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  // Armazena quando segundos se passaram desde o inicio do ciclo atual
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  // Verifica e retorna todos os valores do ciclo ativo
  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: { activeCycleId },
    })
  }

  function setSecondPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    })
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
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
