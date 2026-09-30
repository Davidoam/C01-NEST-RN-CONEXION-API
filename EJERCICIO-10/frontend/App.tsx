import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

type Mascota = {
  id: number;
  nombre: string;
  tipo: string;
  likes: number;
};

const obtenerMascota = async (): Promise<Mascota> => {
  const respuesta = await fetch(`${API_URL}/mascotas/1`);
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }
  return respuesta.json();
};

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [error, setError] = useState('');

  const cargarMascota = async () => {
    try {
      setMascota(await obtenerMascota());
      setError('');
    } catch {
      setError('No se pudo cargar la mascota. Comprueba la conexión con el backend.');
    } finally {
      setCargando(false);
    }
  };

  const darLike = async () => {
    if (!mascota) return;

    setActualizando(true);
    setError('');
    try {
      const respuesta = await fetch(`${API_URL}/mascotas/${mascota.id}/like`, {
        method: 'PATCH',
      });
      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }
      setMascota(await respuesta.json());
    } catch {
      setError('No se pudo guardar el like. Inténtalo de nuevo.');
    } finally {
      setActualizando(false);
    }
  };

  useEffect(() => {
    let activo = true;
    obtenerMascota().then(
      (datos) => {
        if (activo) {
          setMascota(datos);
          setCargando(false);
        }
      },
      () => {
        if (activo) {
          setError('No se pudo cargar la mascota. Comprueba la conexión con el backend.');
          setCargando(false);
        }
      },
    );

    return () => {
      activo = false;
    };
  }, []);

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Cargando mascota…</Text>
      </SafeAreaView>
    );
  }

  if (!mascota) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button
          title="Reintentar"
          onPress={() => {
            setCargando(true);
            setError('');
            void cargarMascota();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mascota.nombre}</Text>
      <Text style={styles.type}>{mascota.tipo}</Text>
      <Text style={styles.likes}>❤️ {mascota.likes}</Text>
      <Button
        title={actualizando ? 'Guardando…' : 'Me gusta'}
        onPress={() => void darLike()}
        disabled={actualizando}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  type: {
    fontSize: 18,
    color: '#666',
  },
  likes: {
    fontSize: 24,
  },
  message: {
    fontSize: 18,
  },
  error: {
    color: '#b00020',
    textAlign: 'center',
  },
});
