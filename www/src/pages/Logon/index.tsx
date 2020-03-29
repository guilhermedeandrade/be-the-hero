import React, { useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function Logon() {
  const [id, setId] = useState('')
  const history = useHistory()

  const handleChange = useCallback((event) => {
    setId(event.target.value)
  }, [])

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()

      try {
        const response = await api.post('sessions', { id })

        localStorage.setItem('ongId', id)
        localStorage.setItem('ongName', response.data.name)

        history.push('/profile')
      } catch (err) {
        alert('Falha no login, tente novamente.')
      }
    },
    [id, history]
  )

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero" />

        <form action="submit" onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            onChange={handleChange}
            value={id}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02031" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}

export default Logon
