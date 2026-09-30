import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const API_URL = 'http://192.168.1.34:3000';

export default function App() {
  const [mensaje, setMensaje] = useState('Pulsa el botón para conectar');
  const [cargando, setCargando] = useState(false);

  const cargarMensaje = async () => {
    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/mensaje`);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      const datos: { texto: string } = await respuesta.json();
      setMensaje(datos.texto);
    } catch {
      setMensaje('No se pudo conectar con el backend');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mi primera conexión</Text>
        <Text style={styles.message}>{mensaje}</Text>

        <Button
          title={cargando ? 'Conectando...' : 'Conectar con Nest'}
          onPress={cargarMensaje}
          disabled={cargando}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});
