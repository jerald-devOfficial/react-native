import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useContext, useEffect, useState } from 'react'

import IconButton from './components/ui/IconButton'
import { Colors } from './constants/styles'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import AuthContextProvider, { AuthContext } from './store/auth-context'

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          )
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        const storedToken = await AsyncStorage.getItem('token')

        if (storedToken) {
          authCtx.authenticate(storedToken)
        }
      } catch (e) {
        console.warn(e)
      } finally {
        setIsTryingLogin(false)
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])

  if (isTryingLogin) {
    return null
  }

  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}
