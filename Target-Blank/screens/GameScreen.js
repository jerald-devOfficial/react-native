import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver()
    }
  }, [currentGuess, userNumber, onGameOver])

  function nextGuessHandler(direction) {
    // direction can be 'lower' or 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    )
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>

      <NumberContainer>{currentGuess}</NumberContainer>

      {/* GUESS */}
      <View>
        <Text>Higher or lower?</Text>
        {/* + - */}
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
        </View>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  )
}
export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  }
})
