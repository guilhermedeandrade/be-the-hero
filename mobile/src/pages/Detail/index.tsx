import React, { useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { composeAsync } from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles'

function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const { incident } = route.params

  const incidentValue = useMemo<string>(
    () =>
      Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(incident.value),
    [incident]
  )

  const message = useMemo<string>(
    () =>
      `Olá ${incident.name} estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${incidentValue}`,
    [incident, incidentValue]
  )

  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {
    composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, styles.marginTopZero]}>
          ONG:
        </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{incidentValue}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso!</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Detail
