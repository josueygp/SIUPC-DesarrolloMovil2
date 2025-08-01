// screens/CalificacionesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { guardarDatos, leerDatos } from '../database';

export default function CalificacionesScreen() {
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    cargarCalificaciones();
  }, []);

  const cargarCalificaciones = async () => {
    const datos = await leerDatos('calificaciones');
    setLista(datos);
  };

  const agregarCalificacion = async () => {
    if (!materia || !calificacion) {
      Alert.alert('Error', 'Debes ingresar materia y calificación');
      return;
    }
    const nuevaCalificacion = { id: Date.now().toString(), materia, calificacion: parseFloat(calificacion) };
    const nuevasCalificaciones = [...lista, nuevaCalificacion];
    await guardarDatos('calificaciones', nuevasCalificaciones);
    setLista(nuevasCalificaciones);
    setMateria('');
    setCalificacion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación"
        value={calificacion}
        onChangeText={setCalificacion}
        keyboardType="numeric"
      />
      <Button title="Agregar" onPress={agregarCalificacion} />
      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.materia}: {item.calificacion}</Text>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 4 }
});
