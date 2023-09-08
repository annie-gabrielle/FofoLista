import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda(o) à FOFOlista!</Text>
      <View style={styles.emojiContainer}>
        <Emoji name="dog" style={styles.emoji} />
        <Emoji name="cat" style={styles.emoji} />
        <Emoji name="heart" style={styles.emoji} />
      </View>
      <View style={styles.buttonContainer}></View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Nome')}>
        
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7D80', // Cor do texto em tom de rosa claro
  },
  emojiContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 30,
  },
  button: {
    backgroundColor: '#FF7D80', // Cor de fundo do botão em tom de rosa claro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF', // Cor do texto do botão em branco
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 35, // Adiciona margem entre o título e o botão
  },
});

export default Inicio;