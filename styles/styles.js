import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    padding: 20
  },

  header: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#c0abef",
    flexDirection: 'row',
  },

  footer: {
    marginTop: 10,
    backgroundColor: "#c0abef",
    flexDirection: 'row'
  },

  title: {
    color: '#fff',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10, 
    fontFamily: "KodeMonoBold"
  },

  author: {
    color: '#fff',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10, 
    fontFamily: "KodeMonoBold"
  },

  row: {
    marginTop: 20,
    padding: 10
  },

  text: {
    fontSize: 18,
    margin: 10, 
    fontFamily: "KodeMono"
  },

  textTitle: {
    fontSize: 20,
    paddingBottom: 10, 
    fontFamily: "KodeMono"
  },

  textInput: {
    borderWidth: 1,
    width: 200,
    fontSize: 18,
    margin: 10,
    fontFamily: "KodeMono"
  },

  pressableButton: {
    fontSize: 18,
    backgroundColor: "#c0abef",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20
  },

  pressableText: {
    color: "#fff",
    fontSize: 18,
    margin: 10, 
    fontFamily: "KodeMonoBold"
  },

  row: {
    marginRight: -3
  },

  pointRow: {
    padding: 10,
    alignItems: "center"
  },

  pointRowText: {
    fontSize: 18
  },

  infoContainer: {
    margin: 20,
    alignItems: "center"
  }
});