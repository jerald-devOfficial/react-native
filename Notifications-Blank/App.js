import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Alert, Button, Platform, StyleSheet, View } from 'react-native'
import { expoPushToken } from './env'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
})

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync()
      let finalStatus = status

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        )
        return
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      console.log('pushTokenData: ', pushTokenData)

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    }

    configurePushNotifications()
  }, [])

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED')
        console.log('notification: ', notification)
        const userName = notification.request.content.data.userName
        console.log('userName: ', userName)
      }
    )

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED')
        console.log('response: ', response)
        const userName = response.notification.request.content.data.userName
        console.log('userName: ', userName)
      }
    )

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  }, [])

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification.',
        data: { userName: 'Jerald' }
      },
      trigger: {
        seconds: 5
      }
    })
  }

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: expoPushToken,
        title: 'Test - sent from a device!',
        body: 'This is a test!'
      })
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <Button
        title='Send Push Notification'
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
