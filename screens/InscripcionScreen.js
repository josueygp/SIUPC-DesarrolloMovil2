// screens/InscripcionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { guardarDatos, leerDatos } from '../database';

export default function InscripcionScreen() {
  const [materia, setMateria] = useState('');
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const datos = await leerDatos('materias');
    setMaterias(datos);
  };

  const agregarMateria = async () => {
    if (!materia) {
      Alert.alert('Error', 'Debes ingresar el nombre de la materia');
      return;
    }
    const nuevaMateria = { id: Date.now().toString(), nombre: materia };
    const nuevasMaterias = [...materias, nuevaMateria];
    await guardarDatos('materias', nuevasMaterias);
    setMaterias(nuevasMaterias);
    setMateria('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscripción a Materias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva materia"
        value={materia}
        onChangeText={setMateria}
      />
      <Button title="Agregar materia" onPress={agregarMateria} />
      <FlatList
        data={materias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.nombre}</Text>}
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
