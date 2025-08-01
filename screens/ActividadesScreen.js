// screens/ActividadesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { guardarDatos, leerDatos } from '../database';

export default function ActividadesScreen({ navigation }) {
  const [actividades, setActividades] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  // Actividades organizadas por día
  const actividadesIniciales = [
    // Lunes y Miércoles
    { id: '1', actividad: 'Fútbol Grupo 1', hora: '15:00 - 17:00', lugar: 'Cancha 1', dias: 'Lunes y Miércoles' },
    { id: '2', actividad: 'Básquetbol Femenil', hora: '15:00 - 17:00', lugar: 'Cancha 2', dias: 'Lunes y Miércoles' },
    { id: '3', actividad: 'Robótica', hora: '15:00 - 17:00', lugar: 'Laboratorio', dias: 'Lunes y Miércoles' },
    
    // Martes y Jueves
    { id: '4', actividad: 'Fútbol Grupo 2', hora: '15:00 - 17:00', lugar: 'Cancha 1', dias: 'Martes y Jueves' },
    { id: '5', actividad: 'Vóley Masculino', hora: '15:00 - 17:00', lugar: 'Cancha 2', dias: 'Martes y Jueves' },
    { id: '6', actividad: 'Arte', hora: '15:00 - 17:00', lugar: 'Salón de Arte', dias: 'Martes y Jueves' },
    
    // Viernes
    { id: '7', actividad: 'Vóley Femenil', hora: '15:00 - 17:00', lugar: 'Cancha 2', dias: 'Viernes' },
    { id: '8', actividad: 'Danza', hora: '15:00 - 17:00', lugar: 'Edificio 1', dias: 'Viernes' },
    { id: '9', actividad: 'Música', hora: '15:00 - 17:00', lugar: 'Aula de Música', dias: 'Viernes' },
  ];

  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        let datos = await leerDatos('actividades');
        console.log('Datos cargados:', datos); // Debug
        
        if (!datos || datos.length === 0) {
          await guardarDatos('actividades', actividadesIniciales);
          datos = actividadesIniciales;
        }
        setActividades(datos);
        
        const seleccionGuardada = await leerDatos('actividadSeleccionada');
        if (seleccionGuardada) setSeleccionada(seleccionGuardada);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'No se pudieron cargar las actividades');
      }
    };
    inicializarDatos();
  }, []);

  const guardarSeleccion = async () => {
    if (!seleccionada) {
      Alert.alert('Error', 'Selecciona una actividad primero');
      return;
    }
    try {
      await guardarDatos('actividadSeleccionada', seleccionada);
      Alert.alert(
        '¡Inscrito!',
        `Actividad: ${seleccionada.actividad}\nDías: ${seleccionada.dias}\nLugar: ${seleccionada.lugar}\nHora: ${seleccionada.hora}`,
        [{ text: 'OK', onPress: () => navigation.navigate('Horario') }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        seleccionada?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => setSeleccionada(item)}
    >
      <Text style={styles.actividad}>{item.actividad}</Text>
      <View style={styles.detalleContainer}>
        <Text style={styles.detalle}>📅 {item.dias}</Text>
        <Text style={styles.detalle}>⏰ {item.hora}</Text>
      </View>
      <Text style={styles.lugar}>📍 {item.lugar}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTIVIDADES EXTRACURRICULARES</Text>
      <Text style={styles.subtitle}>Horario general: 15:00 - 17:00 hrs</Text>
      
      <FlatList
        data={actividades}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity 
        style={styles.botonGuardar} 
        onPress={guardarSeleccion}
        disabled={!seleccionada}
      >
        <Text style={styles.botonTexto}>
          {seleccionada ? 'CONFIRMAR ASISTENCIA' : 'SELECCIONA UNA ACTIVIDAD'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos optimizados
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 5,
    color: '#d32f2f',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedItem: {
    backgroundColor: '#ffebee',
    borderColor: '#d32f2f',
    borderWidth: 2,
  },
  actividad: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
  },
  detalleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detalle: { 
    fontSize: 14, 
    color: '#555',
  },
  lugar: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
    textAlign: 'right',
  },
  botonGuardar: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    opacity: 1,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});