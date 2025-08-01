// database.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarDatos = async (clave, valor) => {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch (e) {
    console.error('Error guardando datos', e);
  }
};

export const leerDatos = async (clave) => {
  try {
    const datos = await AsyncStorage.getItem(clave);
    return datos != null ? JSON.parse(datos) : [];
  } catch (e) {
    console.error('Error leyendo datos', e);
    return [];
  }
};
