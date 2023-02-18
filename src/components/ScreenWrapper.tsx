import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { PlatformColor } from 'react-native'
import { useTheme } from '@react-navigation/native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  navItem: {
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
    alignSelf: 'stretch',
    paddingLeft: 15,
  },
  menu: {
    margin: 5,
    height: 34,
    width: 38,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontFamily: 'Segoe MDL2 Assets',
    fontSize: 16,
    color: PlatformColor('TextControlForeground'),
  },
})

export function ScreenWrapper({ navigation, children, style }: any) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.border,
          width: 48,
          height: '100%',
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              flex: 1,
              bottom: 0,
            }}
          />
          <TouchableHighlight
            accessibilityRole="button"
            accessibilityLabel="Navigation bar expanded"
            {...{ tooltip: 'Definições' }}
            style={styles.menu}
            onPress={() => navigation.push('Settings' as never)}
            activeOpacity={0.5783}
            underlayColor="rgba(0, 0, 0, 0.0241);">
            <Text style={styles.icon}>&#xE713;</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={style}>{children}</View>
    </View>
  )
}
