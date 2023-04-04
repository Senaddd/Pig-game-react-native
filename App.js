import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import { images } from "../my-app/global-images/global";

export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playingState, setPlayingState] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerToPlay, setPlayerToPlay] = useState("player1");

  const diceFunction = () => {
    setRandomNumber(Math.trunc(Math.random() * 6) + 1);
    if (randomNumber != 1) {
      setPlayerOneScore((prev) => ({
        ...prev,
        [playerToPlay]: playerOneScore + randomNumber,
      }));
    } else {
      setPlayerOneScore((prev) => ({ ...prev, [playerToPlay]: 0 }));
      setPlayerToPlay(playerToPlay === "player1" ? "player2" : "player1");
    }
  };

  const startNewGame = () => {
    setPlayingState(false);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  };

  return (
    <View style={styles.container}>
      {playingState ? (
        <>
          <Text>Someone won the game</Text>
          <Button
            title="Press me to start a new game"
            onPress={startNewGame}
          ></Button>
        </>
      ) : (
        <>
          <Text style={{ color: "white" }}>Hello world</Text>
          <Button
            title={"Press me to generate random number"}
            onPress={diceFunction}
          ></Button>
          <View style={styles.imageContainer}>
            <Image
              style={styles.dices}
              source={images.diceRollNumber[randomNumber]}
            ></Image>
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text></Text>
          </View>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    gap: 50,
    padding: 50,
  },
  dices: {
    height: 90,
    width: 80,
  },
});
