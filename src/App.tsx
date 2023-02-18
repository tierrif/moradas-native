import './gesture-handler-hack'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import EditAddress from './screens/EditAddress'
import MainScreen from './screens/MainScreen'
import LightTheme from './themes/LightTheme'
import { SettingsPage } from './screens/Settings'
import { createStackNavigator } from '@react-navigation/stack'

const App = () => {
  const Stack = createStackNavigator()

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={LightTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Edit" component={EditAddress} />
          <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default App
