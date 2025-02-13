import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Button, StyleSheet, View } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED')
        console.log(notification)
        const userName = notification.request.content.data.userName
        console.log(userName)
      }
    )

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED')
        console.log(response)
        const userName = response.notification.request.content.data.userName
        console.log(userName)
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
        body: 'This is the body of the notification',
        data: { userName: 'John Doe' }
      },
      trigger: { seconds: 5 }
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
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
