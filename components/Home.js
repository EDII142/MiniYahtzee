import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, ScrollView } from 'react-native';
import Header from './Header';
import Footer from "./Footer";
import styles from '../styles/styles';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/game";

export default function Home({ navigation }) {
  const [playername, setPlayername] = useState("");
  const [hasPlayername, setHasPlayername] = useState(false);

  const handlePlayername = (value) => {
    if (value.trim().length >  0) {
      setHasPlayername(true);
      Keyboard.dismiss();
    }
  }

  return (
    <>
      <Header/>
      <View style={styles.container}>
        {!hasPlayername ? 
        <>
          <Text style={styles.text}>For scoreboard enter your name</Text>
          <TextInput onChangeText={setPlayername} autoFocus={true} style={styles.textInput}/>
          <Pressable onPress={() => handlePlayername(playername)} style={styles.pressableButton}>
            <Text>Ok</Text>
          </Pressable>
        </>
        :
        <>
        <ScrollView>
          <Text style={styles.textTitle}>Rules of the game</Text>
          <Text multiline="true" style={styles.text}>
            THE GAME: Upper section of the classic Yahtzee
            dice game. You have {NBR_OF_DICES} dices and
            for the every dice you have {NBR_OF_THROWS}
            throws. After each throw you can keep dices in
            order to get same dice spot counts as many as
            possible. In the end of the turn you must select
            your points from {MIN_SPOT} to {MAX_SPOT}.
            Game ends when all points have been selected.
            The order for selecting those is free.
          </Text>
          <Text multiline="true" style={styles.text}>
            POINTS: After each turn game calculates the sum
            for the dices you selected. Only the dices having
            the same spot count are calculated. Inside the
            game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
          </Text>
          <Text multiline="true" style={styles.text}>
            GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
            getting bonus which gives you {BONUS_POINTS} points more.
          </Text>
          <Text style={styles.text}>Good luck, {playername}</Text>
          <Pressable onPress={() => navigation.navigate("Gameboard", {player: playername})} style={styles.pressableButton}>
            <Text style={styles.pressableText}>Play</Text>
          </Pressable>
        </ScrollView>
        </>
      }
      </View>
      <Footer/>
    </>
  )
}