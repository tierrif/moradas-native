import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
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
    alignItems: 'center',
    padding: 20,
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
