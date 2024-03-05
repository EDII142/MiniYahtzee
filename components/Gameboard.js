import React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { NBR_OF_DICE, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/game";
import { Row, Col, Container } from 'react-native-flex-grid';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/styles';

let board = [];

export default function Gameboard({ navigation, route }) {
  const [playername, setPlayername] = useState("");
  const [numberOfThrowsLeft, setNumberOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Start by throwing dice.");
  const [gameEndStatus, setGameEndStatus] = useState(false);

  // Selected or not selected for each dice
  const [selectedDice, setSelectedDice] = useState(new Array(NBR_OF_DICE).fill(false));
  // Dice spots for each dice
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICE).fill(0));
  // Are dice points selected or not
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  // Total points for different spots
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  // Handles starting a new game, it's used in throw dice and select dice points
  const [turnsLeft, setTurnsLeft] = useState(6);

  useEffect(() => {
    if (playername === "" && route.params?.player) {
      setPlayername(route.params.player);
    }
  }, []);

  const diceRow = [];
  for (let dice = 0; dice < NBR_OF_DICE; dice++) {
    diceRow.push(
      <Col key={"dice" + dice} style={styles.row}>
        <Pressable key={"dice" + dice}
          onPress={() => selectDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50} 
            color={getDiceColour(dice)}>
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot} style={styles.pointRow}>
        <Text key={"pointsRow" + spot} style={styles.pointRowText}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton} style={styles.row}>
        <Pressable key={"ButtonRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}>
          <MaterialCommunityIcons key={"buttonRow" + diceButton}
             name={"numeric-" + (diceButton + 1) + "-circle"}
             size={35}
             color={getDicePointsColour(diceButton)}>
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }

  function getDiceColour(i) {
    return selectedDice[i] ? "#71658b" : "#c0abef";
  }

  function getDicePointsColour(i) {
    if (selectedDicePoints[i] && !gameEndStatus) {
      return "#71658b";
    } else {
      return "#c0abef";
    }
  }

  const selectDice = (i) => {
    if (numberOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
    let dice = [...selectedDice];
    dice[i] = selectedDice[i] ? false : true;
    setSelectedDice(dice);
    } else {
      setStatus("You need to throw dice first.")
    }
  }

  const throwDice = () => {
    // This handles starting a new game
    if (turnsLeft === 0) {
      setTurnsLeft(6);
      setSelectedDice("");
      diceSpots.fill(0);
      setSelectedDicePoints("");
      dicePointsTotal.fill(0);
    }

    if (numberOfThrowsLeft === 0 && !gameEndStatus) {
      setStatus("Select your points before next throw.");
      return 1;
    } else if (numberOfThrowsLeft === 0 && gameEndStatus) {
      setGameEndStatus(false);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
    }

    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICE; i++) {
      if (!selectedDice[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNumberOfThrowsLeft(numberOfThrowsLeft-1);
    setDiceSpots(spots);
    setStatus("Select and throw dice again.");
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const selectDicePoints = (i) => {
    if (numberOfThrowsLeft == 0) {
      let selected = [...selectedDice];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDice = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDice * (i + 1);
        setDicePointsTotal(points);
        setSelectedDice("");
        setSelectedDicePoints(selectedPoints);
        setNumberOfThrowsLeft(NBR_OF_THROWS);
        setTurnsLeft(turnsLeft - 1);
        if (turnsLeft === 1) {
          setStatus("You've finished a game. You can start a new game by throwing dice.")
        } else {
          setStatus("Time for new turn.");
        }
        return points[i];
      } else {
        setStatus("You've already selected points for " + (i + 1) + ".");
      }
    } else {
      setStatus("Use your throws before selecting points.");
    }
  }

  let totalPoints = dicePointsTotal.reduce((a, v) => a = a + v, 0);

  if (totalPoints >= BONUS_POINTS_LIMIT) {
    totalPoints = totalPoints + BONUS_POINTS;
  }

  function bonusPoints() {
    let pointsNeeded = BONUS_POINTS_LIMIT - totalPoints;
    if (pointsNeeded > 0) {
      return (
        <Text style={styles.text}>You need {pointsNeeded} points for bonus points.</Text>
      )
    } else {
      return (
        <Text style={styles.text}>Well done, you got extra {BONUS_POINTS} points for getting more than {BONUS_POINTS_LIMIT} points in one game!</Text>
      )
    }
  }

  return (
    <>
      <Header/>
      <ScrollView>
        <View style={styles.container}>
          <Container fluid>
            <Row fluid>{diceRow}</Row>
          </Container>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Throws left: {numberOfThrowsLeft}</Text>
            <Text style={styles.text}>{status}</Text>
            <Pressable onPress={() => throwDice()} style={styles.pressableButton}>
              <Text style={styles.pressableText}>Throw dice</Text>
            </Pressable>
          </View>
          <Container fluid>
            <Row fluid>{pointsRow}</Row>
          </Container>
          <Container>
            <Row fluid>{pointsToSelectRow}</Row>
          </Container>
          <View style={styles.infoContainer}>
            {bonusPoints()}
            <Text style={styles.text}>You've got {totalPoints} points in total!</Text>
            <Text style={styles.text}>Player: {playername}</Text>
          </View>
        </View>
      </ScrollView>
      <Footer/>
    </>
  )
}