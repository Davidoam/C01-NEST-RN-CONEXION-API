import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

type Producto = { id: number; nombre: string; precio: number };

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/productos`);
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      setProductos(await respuesta.json());
      setError('');
    } catch {
      setError('No se pudieron cargar los productos. Comprueba la conexión con el backend.');
    } finally {
      setCargando(false);
    }
  };

  const anadirProducto = async () => {
    const nombreLimpio = nombre.trim();
    const precioNumerico = Number(precio.replace(',', '.'));
    if (!nombreLimpio || !Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      setError('Escribe un nombre y un precio mayor que cero.');
      return;
    }

    setGuardando(true);
    setError('');
    try {
      const respuesta = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreLimpio, precio: precioNumerico }),
      });
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      const nuevoProducto: Producto = await respuesta.json();
      setProductos((actuales) => [...actuales, nuevoProducto]);
      setNombre('');
      setPrecio('');
    } catch {
      setError('No se pudo añadir el producto. Inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  useEffect(() => {
    let activo = true;
    fetch(`${API_URL}/productos`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
        return respuesta.json() as Promise<Producto[]>;
      })
      .then(
        (datos) => {
          if (activo) {
            setProductos(datos);
            setCargando(false);
          }
        },
        () => {
          if (activo) {
            setError('No se pudieron cargar los productos. Comprueba la conexión con el backend.');
            setCargando(false);
          }
        },
      );

    return () => {
      activo = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mini tienda</Text>
      {cargando ? (
        <Text style={styles.message}>Cargando productos…</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={productos}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text style={styles.message}>Aún no hay productos.</Text>}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.nombre} · {item.precio.toFixed(2)} €
            </Text>
          )}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
        accessibilityLabel="Nombre del producto"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="decimal-pad"
        accessibilityLabel="Precio"
      />
      <Button
        title={guardando ? 'Añadiendo…' : 'Añadir producto'}
        onPress={() => void anadirProducto()}
        disabled={guardando}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Recargar productos" onPress={() => void cargarProductos()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 10, padding: 20 },
  list: { alignSelf: 'stretch', flexGrow: 0, maxHeight: 300 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  item: { fontSize: 16, paddingVertical: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  message: { fontSize: 18, textAlign: 'center' },
  error: { color: '#b00020', textAlign: 'center' },
});
