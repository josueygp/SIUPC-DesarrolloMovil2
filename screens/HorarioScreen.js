// screens/HorarioScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HorarioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Horario</Text>
      <Text>Lunes a Viernes: 7:00 AM - 1:30 PM</Text>
      <Text>Materia 1: 7:00 AM - 8:00 AM</Text>
      <Text>Materia 2: 8:10 AM - 9:10 AM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 10 }
});
