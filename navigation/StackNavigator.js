// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import HorarioScreen from '../screens/HorarioScreen';
import CalificacionesScreen from '../screens/CalificacionesScreen';
import InscripcionScreen from '../screens/InscripcionScreen';
import ActividadesScreen from '../screens/ActividadesScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Horario" component={HorarioScreen} />
      <Stack.Screen name="Calificaciones" component={CalificacionesScreen} />
      <Stack.Screen name="Inscripción" component={InscripcionScreen} />
      <Stack.Screen name="Actividades" component={ActividadesScreen} />
    </Stack.Navigator>
  );
}
