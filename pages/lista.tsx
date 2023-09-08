import React, { useState } from 'react';
import Emoji from 'react-native-emoji';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

type Item = {
  id: string;
  name: string;
};



const Lista: React.FC = ({ navigation }) => {
  const [list, setList] = useState<Item[]>(initialList);

  const handleAddItem = (newItemName: string) => {
    if (newItemName.trim() !== '') {
      console.log('Adding new item:', newItemName);

      const newItem: Item = {
        id: `${list.length + 1}`,
        name: newItemName,
      };

      setList([...list, newItem]);
      console.log('Navigating to Cadastroitem screen...');
      navigation.navigate('Cadastroitem', { newItemName });
    } else {
      console.log('No item name provided. Not adding item or navigating.');
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Emoji name="cat" /> Lista <Emoji name="dog" />
      </Text>
      <View style={styles.emojiContainer}>
        {/* Aqui você pode adicionar mais componentes Emoji se necessário */}
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />
      <Button
        title="Adicionar itens"
        onPress={() =>
          navigation.navigate('Cadastroitem', {
            onAddItem: handleAddItem,
          })
        }
      />
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
    marginBottom: 20,
    color: '#FF7D80',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
    backgroundColor: '#FFF9F6',
  },
});

export default Lista;
