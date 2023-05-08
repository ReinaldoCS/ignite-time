import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: bold;

  /* quebra o elemento em linhas quando a tela for menor evitando barra de scroll */
  flex-wrap: wrap;

  color: ${(props) => props.theme['gray-100']};
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    user-select: none;

    padding: 2rem 1rem;
    border-radius: 8px;

    background-color: ${(props) => props.theme['gray-700']};
  }
`

export const Separator = styled.div`
  padding: 2rem 0;

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  color: ${(props) => props.theme['green-500']};
`