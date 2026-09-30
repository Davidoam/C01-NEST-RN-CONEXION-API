import { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState('🔴 Sin conectar');

  const cargarMensaje = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/mensaje`);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      const datos: { texto: string } = await respuesta.json();
      setMensaje(`🟢 ${datos.texto}`);
    } catch {
      setMensaje('🔴 No se pudo conectar con el backend');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Estado del backend</Text>
      <Text style={styles.status}>{mensaje}</Text>
      <Button title="Conectar" onPress={cargarMensaje} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
});
