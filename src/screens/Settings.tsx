'use strict'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { ScreenWrapper } from '../components/ScreenWrapper'

const createStyles = (colors: any) =>
  StyleSheet.create({
    appStyle: {
      flex: 1,
      alignItems: 'flex-start',
      padding: 20,
      backgroundColor: '#EEEEEE',
    },
    heading: {
      marginTop: 30,
      marginBottom: 10,
      fontSize: 23,
      color: colors.text,
    },
    text: {
      paddingTop: 5,
      paddingBottom: 5,
      color: colors.text,
    },
    title: {
      fontWeight: '200',
      fontSize: 26,
      marginTop: 20,
      marginBottom: 10,
      color: colors.text,
    },
    scrollView: {
      paddingRight: 20,
    },
    settingContainer: {
      alignItems: 'flex-start',
    },
    button: {
      height: 30,
      width: 30,
      marginRight: 10,
      padding: 5,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 60,
    },
  })

export const SettingsPage: React.FunctionComponent<{}> = ({
  navigation,
}: any) => {
  const { colors } = useTheme()
  const styles = createStyles(colors)
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
