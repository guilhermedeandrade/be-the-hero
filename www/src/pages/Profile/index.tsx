import React, { useEffect, useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './styles.css'

type Incident = {
  id: number
  title: string
  description: string
  value: number
  ongId: string
}

type State = Incident[]

function Profile() {
  const [incidents, setIncidents] = useState<State>([])
  const history = useHistory()

  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((res) => {
        setIncidents(res.data)
      })
  }, [ongId])

  const handleDeleteIncident = useCallback(
    async (id) => {
      try {
        await api.delete(`incidents/${id}`, {
          headers: {
            Authorization: ongId,
          },
        })

        setIncidents(incidents.filter((incident) => incident.id !== id))
      } catch (err) {
        alert('Erro ao deletar caso, tente novamente')
      }
    },
    [ongId, setIncidents, incidents]
  )

  const handleLogout = useCallback(() => {
    localStorage.clear()

    history.push('/')
  }, [history])

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
