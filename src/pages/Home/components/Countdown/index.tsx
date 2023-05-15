import { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../contexts/CycleContext'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondPassed,
  } = useContext(CycleContext)

  // Verifica e retorna em o total se segundos dentro do ciclo ativo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // Realiza a soma de total de segundos do clico se subtrai pelos segundos passados
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Realiza a logica do countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondPassed(totalSeconds)
        } else {
          setSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    // Função para 'resetar' o que estava sendo executado no userEffect anterior
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondPassed,
  ])

  // Atualiza o titulo da página de acordo com countdown
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else document.title = 'Ignite Timerc'
  }, [minutes, seconds, activeCycle])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
