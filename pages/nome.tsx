import React, { useState } from 'react';
import Emoji from 'react-native-emoji';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Nome = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar o alerta

  const handleIrParadrawer = () => {
    navigation.navigate('CustomDrawer', { value: username });
  };

  const handleLogin = () => {
    // Lógica de autenticação
    navigation.navigate('Foto');
  };

  const handleSubmit = async () => {
    if (username.trim() === '') {
      setShowAlert(true); // Mostra o alerta se o nome de usuário estiver vazio
      return;
    }

    const user = { name: username };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('User saved in AsyncStorage:', user);
    handleLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre seu usuário <Emoji name="dog" style={styles.emoji} /></Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>

      {/* Renderização condicional do alerta */}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Por favor, digite um nome de usuário válido.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9F6', // Cor de fundo creme claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF7D80', // Cor do texto em tom de rosa claro
  },
  input: {
    borderWidth: 1,
    borderColor: '#F2BAC2', // Cor da borda em tom de rosa claro
    padding: 10,
    width: '100%',
    marginBottom: 20,
    color: '#FF7D80', // Cor do texto em tom de rosa claro
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: '#FFF', // Cor de fundo do TextInput em branco
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
    marginTop: 15, // Adiciona margem entre o título e o botão
  },
  alertContainer: {
    backgroundColor: '#FFCCCC', // Cor de fundo do alerta
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  alertText: {
    color: '#FF0005', // Cor do texto do alerta
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Nome;