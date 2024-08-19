import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [arvaus, setArvaus] = useState('');
  const [randomNumero, setRandomNumero] = useState(Math.floor(Math.random() * 100) + 1);
  const [yritykset, setYritykset] = useState(0);
  const [errorViesti, setErrorViesti] = useState('');

  const handleArvaus = () => {
    const parsedArvaus = parseInt(arvaus, 10);

    if (isNaN(parsedArvaus) || parsedArvaus < 1 || parsedArvaus > 100) {
      setErrorViesti('Type a number between 1-100');
      return;
    }

    setYritykset(yritykset + 1);
    setErrorViesti('');

    if (parsedArvaus === randomNumero) {
      Alert.alert(
        'Congratulations!',
        `You guessed the number in ${yritykset + 1} tries.`,
        [{ text: 'OK', onPress: () => {
          setRandomNumero(Math.floor(Math.random() * 100) + 1);
          setYritykset(0);
          setArvaus('');
        } }]
      );
    } else if (parsedArvaus < randomNumero) {
      setErrorViesti('Your guess was too low.');
    } else {
      setErrorViesti('Your guess was too high.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess a number between 1-100</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={arvaus}
        onChangeText={setArvaus}
        placeholder="Type a number here"
      />
      <TouchableOpacity style={styles.button} onPress={handleArvaus}>
        <Text style={styles.buttonText}>Make a guess!</Text>
      </TouchableOpacity>
      {errorViesti ? <Text style={styles.errorText}>{errorViesti}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#4da6ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
});
