import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../..'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CycleContext)

  // Armazena quando segundos se passaram desde o inicio do ciclo atual
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
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
          activeCycle.startDate,
        )

        console.log(secondsDifference)

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          // setActiveCycleId(null)
          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    // Função para 'resetar' o que estava sendo executado no userEffect anterior
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  // Atualiza o titulo da página de acordo com countdown
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
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
