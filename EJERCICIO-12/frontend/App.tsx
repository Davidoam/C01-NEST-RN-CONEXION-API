import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

type Criatura = {
  id: number;
  nombre: string;
  tipo: string;
  emoji: string;
  likes: number;
};

const obtenerCriaturas = async (): Promise<Criatura[]> => {
  const respuesta = await fetch(`${API_URL}/criaturas`);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  return respuesta.json();
};

export default function App() {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [id, setId] = useState('');
  const [seleccionada, setSeleccionada] = useState<Criatura | null>(null);
  const [cargando, setCargando] = useState(true);
  const [buscando, setBuscando] = useState(false);
  const [dandoLike, setDandoLike] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let activa = true;
    obtenerCriaturas().then(
      (datos) => {
        if (activa) {
          setCriaturas(datos);
          setCargando(false);
        }
      },
      () => {
        if (activa) {
          setError('No se pudieron cargar las criaturas. Comprueba la conexión con el backend.');
          setCargando(false);
        }
      },
    );
    return () => {
      activa = false;
    };
  }, []);

  const buscarCriatura = async () => {
    const idBuscado = Number(id);
    if (!id.trim() || !Number.isInteger(idBuscado) || idBuscado < 1) {
      setSeleccionada(null);
      setError('Escribe un ID válido (1, 2 o 3).');
      return;
    }

    setBuscando(true);
    setError('');
    try {
      const respuesta = await fetch(`${API_URL}/criaturas/${idBuscado}`);
      if (respuesta.status === 404) {
        setSeleccionada(null);
        throw new Error('No existe una criatura con ese ID.');
      }
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      setSeleccionada(await respuesta.json());
    } catch (fallo) {
      setError(
        fallo instanceof Error && fallo.message.startsWith('No existe')
          ? fallo.message
          : 'No se pudo buscar la criatura. Comprueba la conexión con el backend.',
      );
    } finally {
      setBuscando(false);
    }
  };

  const darLike = async () => {
    if (!seleccionada) return;

    setDandoLike(true);
    setError('');
    try {
      const respuesta = await fetch(`${API_URL}/criaturas/${seleccionada.id}/like`, {
        method: 'PATCH',
      });
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      const actualizada: Criatura = await respuesta.json();
      setSeleccionada(actualizada);
      setCriaturas((actuales) =>
        actuales.map((criatura) =>
          criatura.id === actualizada.id ? actualizada : criatura,
        ),
      );
    } catch {
      setError('No se pudo guardar el like. Inténtalo de nuevo.');
    } finally {
      setDandoLike(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Creature Lab</Text>
      <Text style={styles.subtitulo}>Explora las criaturas y descubre sus poderes.</Text>

      {cargando ? (
        <Text style={styles.mensaje}>Cargando criaturas…</Text>
      ) : (
        <FlatList
          data={criaturas}
          keyExtractor={(item) => String(item.id)}
          style={styles.lista}
          ListEmptyComponent={<Text style={styles.mensaje}>No hay criaturas disponibles.</Text>}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.emoji}  {item.nombre} · ❤️ {item.likes}
            </Text>
          )}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="ID de la criatura (1, 2, 3…)"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
        accessibilityLabel="ID de la criatura"
      />
      <Button
        title={buscando ? 'Buscando…' : 'Buscar'}
        onPress={() => void buscarCriatura()}
        disabled={buscando}
      />

      {seleccionada && (
        <View style={styles.ficha}>
          <Text style={styles.nombre}>
            {seleccionada.emoji} {seleccionada.nombre}
          </Text>
          <Text style={styles.tipo}>Tipo: {seleccionada.tipo}</Text>
          <Text style={styles.likes}>❤️ {seleccionada.likes}</Text>
          <Button
            title={dandoLike ? 'Guardando…' : 'Me gusta'}
            onPress={() => void darLike()}
            disabled={dandoLike}
          />
        </View>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10, backgroundColor: '#f7f8fc' },
  titulo: { fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#18213a' },
  subtitulo: { fontSize: 15, textAlign: 'center', color: '#5d6780' },
  lista: { maxHeight: 180, flexGrow: 0 },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c7cde0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  ficha: { marginTop: 4, padding: 16, backgroundColor: '#e8edff', borderRadius: 12, gap: 8 },
  nombre: { fontSize: 21, fontWeight: '700', color: '#18213a' },
  tipo: { fontSize: 16, color: '#404a65' },
  likes: { fontSize: 18 },
  mensaje: { padding: 12, textAlign: 'center', color: '#5d6780' },
  error: { color: '#b00020', textAlign: 'center' },
});
