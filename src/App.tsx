import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { PlatformColor, StyleSheet, useColorScheme, View } from 'react-native'
import MainScreen from './components/MainScreen'
import LightTheme from './themes/LightTheme'
import {
  RawThemeContext,
  ThemeContext,
  ThemeMode,
  ThemeSetterContext,
} from './themes/Theme'

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
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
  drawer: {
    backgroundColor: PlatformColor('NavigationViewDefaultPaneBackground'),
    height: '100%',
  },
  drawerText: {
    color: PlatformColor('TextControlForeground'),
  },
  drawerTopDivider: {
    borderTopWidth: 0.5,
    borderColor: PlatformColor('TextControlForeground'),
    borderRadius: 0,
  },
  drawerBottomDivider: {
    borderBottomWidth: 0.5,
    borderColor: PlatformColor('TextControlForeground'),
    borderRadius: 0,
  },
})

const App = () => {
  const [rawTheme, setRawTheme] = useState<ThemeMode>('system')
  const colorScheme = useColorScheme()
  const theme = rawTheme === 'system' ? colorScheme! : rawTheme

  return (
    <ThemeSetterContext.Provider value={setRawTheme}>
      <RawThemeContext.Provider value={rawTheme}>
        <ThemeContext.Provider value={theme}>
          <NavigationContainer theme={LightTheme}>
            <View style={styles.appStyle}>
              <MainScreen />
            </View>
          </NavigationContainer>
        </ThemeContext.Provider>
      </RawThemeContext.Provider>
    </ThemeSetterContext.Provider>
  )
}

export default App
