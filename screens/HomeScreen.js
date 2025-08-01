// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Control Escolar</Text>
      <Button title="Ver Horario" onPress={() => navigation.navigate('Horario')} />
      <Button title="Ver Calificaciones" onPress={() => navigation.navigate('Calificaciones')} />
      <Button title="Inscribirse a materias" onPress={() => navigation.navigate('Inscripción')} />
      <Button title="Actividad extracurricular" onPress={() => navigation.navigate('Actividades')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 }
});
