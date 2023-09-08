import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, HeaderBackButton } from '@react-navigation/native';


type CadastroItemProps = {
  navigation: any;
  route: any;
};

const CadastroItem: React.FC<CadastroItemProps> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [itemId, setItemId] = useState('');
  const updateDataAndStorage = route.params?.updateDataAndStorage;

  useEffect(() => {
    if (route.params?.editMode) {
      const { itemToEdit } = route.params;
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
      setEditMode(true);
      setItemId(itemToEdit.id);
    }
  }, [route.params]);

  const handleSaveItem = async () => {
    if (name.trim() !== '') {
      try {
        const newItem = { id: editMode ? itemId : String(Date.now()), name, quantity };
        let updatedItems = [];

        if (editMode) {
          const jsonValue = await AsyncStorage.getItem('@items');
          if (jsonValue !== null) {
            const items = JSON.parse(jsonValue);
            updatedItems = items.map(item => (item.id === itemId ? newItem : item));
          }
        } else {
          const jsonValue = await AsyncStorage.getItem('@items');
          if (jsonValue !== null) {
            const items = JSON.parse(jsonValue);
            updatedItems = [...items, newItem];
          } else {
            updatedItems = [newItem];
          }
        }

        await AsyncStorage.setItem('@items', JSON.stringify(updatedItems));
        if (updateDataAndStorage) {
          updateDataAndStorage(updatedItems);
        }
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar o item no AsyncStorage:', error);
      }
    }
  };

  

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>{editMode ? 'Editar Item' : 'Novo Item'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        placeholderTextColor="#ffcacb"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="#ffcacb"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric" 
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveItem}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonvoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#F2BAC2',
    padding: 10,
    marginBottom: 20,
    color: '#FF7D80',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FF7D80',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonvoltar: {
    marginTop:25,
    backgroundColor: '#FF7D80',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default CadastroItem;
