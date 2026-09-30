import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

export default function HomeScreen() {
  const [mensaje, setMensaje] = useState('Sin conectar');
  const [conectado, setConectado] = useState(false);
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
      setConectado(true);
    } catch {
      setMensaje('No se pudo conectar con el backend');
      setConectado(false);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarMensaje();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Estado del backend</Text>
      <Text style={styles.indicador}>{conectado ? '🟢' : '🔴'}</Text>
      <Text style={styles.status}>{cargando ? 'Cargando…' : mensaje}</Text>
      <Button title="Recargar" onPress={() => void cargarMensaje()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  indicador: {
    fontSize: 40,
  },
  status: {
    fontSize: 18,
  },
});
