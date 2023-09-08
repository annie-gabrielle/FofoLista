import React, { useCallback,useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Emoji from 'react-native-emoji';
import { useFocusEffect } from '@react-navigation/native';

type ListItem = {
  id: string;
  name: string;
  quantity: string;
  isPurchased: boolean;
  isSelected: boolean;
};

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const navigationInstance = useNavigation();
  const [data, setData] = useState<ListItem[]>([]);

  const fetchItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@items');
      if (jsonValue !== null) {
        const items = JSON.parse(jsonValue);
        const itemsWithSelection = items.map(item => ({ ...item, isSelected: false }));
        setData(itemsWithSelection);
      }
    } catch (error) {
      console.error('Erro ao recuperar os itens do AsyncStorage:', error);
    }
  };

 useFocusEffect (useCallback(() => {
    fetchItems();
  }, []));

  const deleteItem = async (itemId: string) => {
    const updatedData = data.filter(item => item.id !== itemId);
    await updateDataAndStorage(updatedData); // Use "await" to ensure the data is updated before proceeding
  };

  const handleItemLongPress = (itemId: string) => {
    Alert.alert(
      'Opções',
      'O que você deseja fazer?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Editar', onPress: () => handleEditItem(itemId) },
        { text: 'Excluir', onPress: () => deleteItem(itemId) },
      ],
      { cancelable: true }
    );
  };

  const handleEditItem = (itemId: string) => {
    const itemToEdit = data.find(item => item.id === itemId);
    if (itemToEdit) {
      navigation.navigate('Cadastro item', { editMode: true, itemToEdit });
    }
  };

  const updateDataAndStorage = async (updatedData: ListItem[]) => {
    try {
      await AsyncStorage.setItem('@items', JSON.stringify(updatedData));
      setData(updatedData); // Atualiza o estado com os novos dados
    } catch (error) {
      console.error('Erro ao atualizar dados no AsyncStorage:', error);
    }
  };

  const confirmClearAllItems = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir todos os itens?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: clearAllItems },
      ],
      { cancelable: true }
    );
  };

  const clearAllItems = async () => {
    try {
      await AsyncStorage.removeItem('@items');
      setData([]);
    } catch (error) {
      console.error('Erro ao limpar os itens:', error);
    }
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onLongPress={() => handleItemLongPress(item.id)}
      onPress={() => navigation.navigate('Lista de Compras', { listId: item.id })}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
      </View>
  
      <View style={styles.checkboxContainer}>
        {item.isSelected && <Text style={styles.checkmarkText}>Comprado</Text>}
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleCheckboxToggle(index)}
        >
          {item.isSelected && (
            <Emoji name="white_check_mark" style={styles.checkmark} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  



  const handleCheckboxToggle = (index: number) => {
    const updatedData = [...data];
    updatedData[index].isSelected = !updatedData[index].isSelected;
    updateDataAndStorage(updatedData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', marginBottom: 20 }}
      />

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Clear All Items Button */}
        <TouchableOpacity
          style={[styles.clearButton, styles.button]}
          onPress={confirmClearAllItems}
        >
          <Text style={styles.addButtonText}>
            <Emoji name="wastebasket" style={styles.emoji} /> Deletar tudo
          </Text>
        </TouchableOpacity>

        {/* Add Item Button */}
        <TouchableOpacity
          style={[styles.addButton, styles.button]}
          onPress={() => navigation.navigate('Cadastro item')}
        >
          <Text style={styles.addButtonText}>Adicionar item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF9F6',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 22,
    color: '#FF7D80',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange children side by side
    justifyContent: 'space-between', // Space evenly between children
    marginBottom: 20, // Add margin at the bottom for separation
  },

  // General button styles
  button: {
    flex: 1, // Equal width for both buttons
    marginRight: 10, // Add margin between the buttons
  },

  // Add Item button styles
  addButton: {
    backgroundColor: '#FF7D80',
    padding: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },

  // Clear All Items button styles
  clearButton: {
    backgroundColor: '#FF7D80',
    padding: 15,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkmarkText: {
    marginRight: 5,
    color: '#FF7D80',
    fontSize: 14,
  },
  
  checkmarkPlaceholder: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkmark: {
    color: '#FF7D80',
    fontSize: 18,
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  alertButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
