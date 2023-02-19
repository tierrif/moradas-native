'use strict'
import { Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'
import RNFS from 'react-native-fs'
import pkg from '../../package.json'

export const SettingsPage: React.FunctionComponent<{}> = ({
  navigation,
}: any) => {
  const { colors } = useTheme()
  const styles = useStyles()
  const isScreenFocused = useIsFocused()

  const handleBack = () => {
    navigation.push('Home')
  }

  return isScreenFocused ? (
    <ScreenWrapper style={styles.appStyle} navigation={navigation}>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableHighlight
          accessibilityRole="button"
          {...{ tooltip: 'Voltar' }}
          onPress={handleBack}
          style={styles.button}
          underlayColor={colors.border}
          activeOpacity={0.2}>
          <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE72B;</Text>
        </TouchableHighlight>
        <Text style={styles.title}>Definições</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Text style={styles.subTitle}>Versão: {pkg.version}</Text>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginBottom: 0,
        }}>
        <Text style={{ marginRight: 3, ...styles.subTitle, marginTop: 0 }}>
          Pasta de configurações:
        </Text>
        <Text
          selectable
          aria-selected={true}
          style={{ ...styles.subTitle, fontWeight: 'normal', marginTop: 0 }}>
          {RNFS.DocumentDirectoryPath}
        </Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginBottom: 0,
        }}>
        <Text style={{ ...styles.subTitle, marginTop: 0 }}>
          Este software é distribuido sob a licença MIT.
        </Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        <Text style={{ ...styles.subTitle, marginTop: 0 }}>
          Copyright (c) 2023 Tierri Ferreira
        </Text>
      </View>
    </ScreenWrapper>
  ) : (
    <View />
  )
}
