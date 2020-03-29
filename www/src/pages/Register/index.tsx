import React, { useCallback, useReducer } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

type State = {
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_WHATSAPP'; payload: string }
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_UF'; payload: string }

const initialState: State = {
  name: '',
  email: '',
  whatsapp: '',
  city: '',
  uf: '',
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      }
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      }
    case 'SET_WHATSAPP':
      return {
        ...state,
        whatsapp: action.payload,
      }
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      }
    case 'SET_UF':
      return {
        ...state,
        uf: action.payload,
      }
    default:
      return state
  }
}

function Register() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory()

  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault()

      try {
        const response = await api.post('ongs', state)

        alert(`Seu ID de acesso: ${response.data.id}`)

        history.push('/')
      } catch (err) {
        alert(`Erro no cadastro! Tente novamente`)
      }
    },
    [state, history]
  )

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02031" />
            Já tenho cadastro
          </Link>
        </section>

        <form action="submit" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'SET_NAME', payload: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="E-mail"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={state.whatsapp}
            onChange={(e) =>
              dispatch({ type: 'SET_WHATSAPP', payload: e.target.value })
            }
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={state.city}
              onChange={(e) =>
                dispatch({ type: 'SET_CITY', payload: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="UF"
              value={state.uf}
              style={{ width: 80 }}
              onChange={(e) =>
                dispatch({ type: 'SET_UF', payload: e.target.value })
              }
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
