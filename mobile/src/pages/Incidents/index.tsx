import React, { useCallback, useEffect, useReducer } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

type Incident = {
  id: number
  title: string
  description: string
  value: number
  ong_id: string
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}

type State = {
  incidents: Incident[]
  total: number
  page: number
  loading: boolean
}

type Action =
  | { type: 'SET_INCIDENTS'; payload: Incident[] }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: State = { incidents: [], total: 0, page: 1, loading: false }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload }
    case 'SET_TOTAL':
      return { ...state, total: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error()
  }
}

function Incidents() {
  const [{ incidents, total, page, loading }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const navigation = useNavigation()

  const fetchIncidents = useCallback(async () => {
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })

    const response = await api.get(`incidents?page=${page}`)

    dispatch({
      type: 'SET_INCIDENTS',
      payload: [...incidents, ...response.data],
    })
    dispatch({ type: 'SET_TOTAL', payload: response.headers['x-total-count'] })
    dispatch({ type: 'SET_PAGE', payload: page + 1 })
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [loading, total, incidents, page])

  useEffect(() => {
    fetchIncidents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function navigateToDetail(incident: Incident) {
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve uma vida
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={fetchIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Incidents
