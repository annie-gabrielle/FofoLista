import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Foto = ({ navigation }) => {
  const handleSelectPhoto = async (imageId) => {
    try {
      await AsyncStorage.setItem('userPhotoId', JSON.stringify(imageId));
      console.log('User photo ID saved:', imageId);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user photo ID:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma foto de bichinho fofo</Text>
      <ScrollView contentContainerStyle={styles.imagesContainer}>
        {cuteAnimalImages.map((image) => (
          <TouchableOpacity
            key={image.id}
            style={styles.imageContainer}
            onPress={() => {
              handleSelectPhoto(image.id);
              console.log('Selected photo ID:', image.id);
            }}
          >
            <Image source={image.source} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 20,
    color: '#FF7D80',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});

export default Foto;
