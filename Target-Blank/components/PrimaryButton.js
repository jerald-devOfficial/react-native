import { Pressable, StyleSheet, Text, View } from 'react-native'

function PrimaryButton({ children }) {
  function pressHandler() {
    console.log('Pressed!')
  }
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: '#640233' }} // only works on android
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2
  },
  buttonText: {
    color: 'white',
    textAlign: 'center' // needed as RN styles do not do inheritance
  },
  pressed: {
    opacity: 0.75
  }
})
