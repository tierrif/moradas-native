'use strict'
import { Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'

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
          flex: 1,
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
    </ScreenWrapper>
  ) : (
    <View />
  )
}
