import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Emoji from 'react-native-emoji';

const cuteAnimalImages = [
  { id: 1, source: require('../assets/dog1.jpg') },
  { id: 2, source: require('../assets/dog2.jpg') },
  { id: 3, source: require('../assets/dog3.jpg') },
  { id: 4, source: require('../assets/dog4.jpg') },
  { id: 5, source: require('../assets/dog5.jpg') },
  { id: 6, source: require('../assets/cat1.jpg') },
  { id: 7, source: require('../assets/cat2.jpg') },
  { id: 8, source: require('../assets/cat3.jpg') },
  { id: 9, source: require('../assets/cat4.jpg') },
  { id: 10, source: require('../assets/cat5.jpg') },
];

const CustomDrawer = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUsername(user.name);
        }

        const userPhotoId = await AsyncStorage.getItem('userPhotoId');
        if (userPhotoId !== null) {
          const selectedImageObj = cuteAnimalImages.find(image => image.id === JSON.parse(userPhotoId));
          if (selectedImageObj) {
            setUserPhoto(selectedImageObj.source);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'userPhotoId']);
       navigation.navigate('Inicio'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const showConfirmationPopup = () => {
    setShowConfirmation(true);
  };

  const hideConfirmationPopup = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {userPhoto && <Image source={userPhoto} style={styles.userPhoto} />}
      {username && <Text style={styles.userInfo}>Olá {username}!</Text>}

      <Text style={styles.instrucoesinicio}>Seja bem-vinda(o)!  <Emoji name="heart" /></Text>
      <Text style={styles.instrucoes}>Para deletar ou editar um item da lista, basta pressionar esse item. Para sinalizar uma compra, clique na caixa ao lado do texto <Emoji name="dog"  /></Text>
      <Text style={styles.instrucoes}>Para Deletar seu usuário e reiniciar o aplicativo clique em Trocar de Usuário. <Emoji name="cat"  /> </Text>
      <Text style={styles.instrucoes}>Para limpar a lista clique na lixeira da tela principal. <Emoji name="heart"  /> </Text>
    
    
      <TouchableOpacity onPress={showConfirmationPopup} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Trocar de Usuário</Text>
    </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={hideConfirmationPopup}
      >
       <View style={styles.modalContainer}>
  <View style={styles.modalContent}>
    <Text style={styles.modalText}>Deseja trocar de usuário?</Text>
    <View style={styles.buttonContainer}>
  <View style={styles.espaco}>
  <Button
        title="Confirmar"
        color="#FF7D80"
        onPress={handleLogout}
      />
  </View>
      <Button
        title="Cancelar"
        color="#FF7D80"
        onPress={hideConfirmationPopup}
      />
    </View>
  </View>
</View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF9F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FF7D80',
  },
  userInfo: {
    fontSize: 22,
    marginBottom: 8,
    color: '#FF7D80',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  userPhoto: {
    width: 150,
    height: 150,
    marginTop: 1,
    borderRadius: 60,
    marginBottom: 18,
    alignSelf: 'center',
  },
  instrucoesinicio: {
    fontSize: 17,
    color: '#FF7D80',
    marginTop: 28,
    marginBottom: 23,
  },
  instrucoes: {
    fontSize: 17,
    color: '#FF7D80',
    marginBottom: 10,
  },
  coracao: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFF9F6',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7D80',
  },
espaco:{
  marginRight:20,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
},
logoutButton: {
  backgroundColor: '#FF7D80',
  padding: 10,
  borderRadius: 5,
  alignSelf: 'flex-end',
  marginTop: 45,
},
logoutButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default CustomDrawer;
