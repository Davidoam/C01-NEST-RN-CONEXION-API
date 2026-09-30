import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

type Heroe = {
  id: number;
  nombre: string;
  poder: string;
  universo: string;
};

export default function App() {
  const [id, setId] = useState('');
  const [heroe, setHeroe] = useState<Heroe | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscarHeroe = async () => {
    const idBuscado = id.trim();
    if (!/^\d+$/.test(idBuscado) || Number(idBuscado) < 1) {
      setHeroe(null);
      setError('Escribe un ID válido (1, 2 o 3).');
      return;
    }

    setCargando(true);
    setError('');
    setHeroe(null);

    try {
      const respuesta = await fetch(`${API_URL}/heroes/${encodeURIComponent(idBuscado)}`);
      if (respuesta.status === 404) {
        throw new Error(`No se encontró un héroe con el ID ${idBuscado}.`);
      }
      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const datos: Heroe = await respuesta.json();
      setHeroe(datos);
    } catch (errorDeRed) {
      setError(
        errorDeRed instanceof Error
          ? errorDeRed.message
          : 'No se pudo conectar con el backend.',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Busca tu superhéroe</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del héroe (1, 2, 3...)"
        keyboardType="numeric"
        returnKeyType="search"
        value={id}
        onChangeText={setId}
        onSubmitEditing={() => void buscarHeroe()}
      />
      <Button
        title={cargando ? 'Buscando…' : 'Buscar'}
        onPress={() => void buscarHeroe()}
        disabled={cargando}
      />
      {cargando && <Text style={styles.message}>Buscando héroe…</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {heroe && (
        <View style={styles.card}>
          <Text style={styles.name}>{heroe.nombre}</Text>
          <Text>Poder: {heroe.poder}</Text>
          <Text>Universo: {heroe.universo}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  card: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  message: {
    fontSize: 16,
  },
  error: {
    color: '#b00020',
    fontSize: 16,
  },
});
