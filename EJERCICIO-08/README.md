# Ejercicio 08 · Menú del restaurante

La API devuelve cuatro productos en `GET /productos`. La app obtiene el array al abrirse y lo muestra elemento a elemento con `FlatList`.

## Estructura

- `backend/src/productos/productos.service.ts`: contiene el array del menú.
- `backend/src/productos/productos.controller.ts`: publica `GET /productos`.
- `frontend/src/app/index.tsx`: pantalla activa de Expo Router; `App.tsx` mantiene la misma pantalla como referencia.

## Ejecutar

Abre dos terminales desde `EJERCICIO-08`.

Backend:

```powershell
cd backend
npm.cmd run start:dev
```

Frontend:

```powershell
cd frontend
npm.cmd start
```

La app usa `http://172.23.144.1:3000`. Si cambia la IP local del ordenador, actualiza `API_URL` en `App.tsx` y `src/app/index.tsx`. Para el emulador Android puedes usar `http://10.0.2.2:3000`.

## Checkpoints

1. Abre `http://localhost:3000/productos` y observa el array JSON.
2. Abre la app y comprueba que aparecen las cuatro tarjetas del menú.
3. Detén el backend y vuelve a cargar la app para comprobar el mensaje de error.

## Pregunta

¿Qué relación existe entre el array del Service y `data={productos}`? El Service es la fuente de los datos; el frontend los recibe con `fetch` y `FlatList` genera la lista, elemento a elemento.
