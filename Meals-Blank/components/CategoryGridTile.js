import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

function CategoryGridTile({ title, color }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }} // for ripple effect on android
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null
        ]}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CategoryGridTile

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4, // for shadow on android
    backgroundColor: 'white', // for shadow on ios
    shadowColor: 'black', // for shadow on ios
    shadowOpacity: 0.25, // for shadow on ios
    shadowOffset: { width: 0, height: 2 }, // for shadow on ios
    shadowRadius: 8, // for shadow on ios
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible' // for ripple effect on ios
  },
  button: {
    flex: 1
  },
  buttonPressed: {
    opacity: 0.5
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  }
})
