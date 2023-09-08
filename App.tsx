import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Inicio from './pages/inicio';
import Nome from './pages/nome';
import Foto from './pages/foto';
import Home from './pages/home';
import Cadastroitem from './pages/cadastroitem';
import CustomDrawer from './pages/customdrawer';
import { AppProvider } from './pages/AppContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [initialScreen, setInitialScreen] = useState('Inicio');

  useEffect(() => {
    async function checkUserLoggedIn() {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setInitialScreen('Home');
        }
      } catch (error) {
        console.error('Error checking user login:', error);
      }
    }
    checkUserLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Nome" component={Nome} />
        <Stack.Screen name="Foto" component={Foto} />
        <Stack.Screen name="Home" component={HomeDrawer} />
        <Stack.Screen name="Cadastro item" component={Cadastroitem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeDrawer() {
  return (
    <AppProvider>

<Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Lista de Compras" component={Home} />
      <Drawer.Screen name="Trocar de usuário" component={Inicio} />
    </Drawer.Navigator>
    </AppProvider>

  );
}

export default App;
