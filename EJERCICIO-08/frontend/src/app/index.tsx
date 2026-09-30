import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.23.144.1:3000';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
};

export default function HomeScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`${API_URL}/productos`);
      if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
      }

      const datos: Producto[] = await respuesta.json();
      setProductos(datos);
    } catch {
      setError('No se pudo cargar el menú. Comprueba la conexión con el backend.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarProductos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.title}>Menú del restaurante</Text>}
        ListEmptyComponent={
          <Text style={styles.empty}>{error || (cargando ? 'Cargando menú…' : 'No hay productos.')}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.price}>
              {item.precio.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
              })}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  emoji: {
    fontSize: 24,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
  },
  empty: {
    paddingVertical: 20,
    fontSize: 16,
    color: '#666',
  },
});
