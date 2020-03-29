import React, { useReducer, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './styles.css'

type State = {
  title: string
  description: string
  value: string
}

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_VALUE'; payload: string }

const initialState: State = {
  title: '',
  description: '',
  value: '',
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      }
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      }
    default:
      return state
  }
}

function NewIncident() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      try {
        await api.post('incidents', state, {
          headers: {
            Authorization: ongId,
          },
        })

        history.push('/profile')
      } catch (err) {
        alert('Erro ao criar novo caso, tente novamente.')
      }
    },
    [state, ongId, history]
  )

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02031" />
            Voltar para home
          </Link>
        </section>

        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título do caso"
            value={state.title}
            onChange={(e) =>
              dispatch({ type: 'SET_TITLE', payload: e.target.value })
            }
          />
          <textarea
            placeholder="Descrição"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={state.value}
            onChange={(e) =>
              dispatch({ type: 'SET_VALUE', payload: e.target.value })
            }
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident
