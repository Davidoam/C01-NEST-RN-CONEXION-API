# Ejercicio 07 · Carga automática

La app consulta el endpoint `GET /mensaje` automáticamente cuando se abre la pantalla. Mientras espera, muestra “Cargando…”. El botón “Recargar” permite repetir la petición.

## Estructura

- `backend/`: API NestJS que responde con un objeto `{ "texto": "¡Conexión conseguida!" }`.
- `frontend/`: app Expo con React Native y Expo Router. La pantalla principal está en `src/app/index.tsx`; `App.tsx` conserva la misma implementación como referencia.

## Ejecutar

Abre dos terminales desde la carpeta `EJERCICIO-07`.

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

La app apunta a `http://172.23.144.1:3000`. Si cambia la IP de red del ordenador, actualiza `API_URL` en `App.tsx` y `src/app/index.tsx`. En un emulador Android puedes usar `http://10.0.2.2:3000`.

## Conceptos

- `useEffect(() => { ... }, [])` ejecuta la carga al montar la pantalla.
- `useState` conserva el mensaje, el estado de conexión y el indicador de carga.
- `try/catch/finally` muestra un error entendible y siempre quita el estado de carga.

## Checkpoints

1. Al abrir la app, observa “Cargando…” antes de recibir respuesta.
2. Con el backend activo, comprueba el indicador verde y el mensaje de conexión.
3. Pulsa “Recargar” y comprueba que vuelve a hacer la petición.
4. Detén el backend y vuelve a cargar para ver el estado de error.

## Pregunta

¿Qué diferencia hay entre cargar con un botón y cargar con `useEffect`? Con el botón, la petición requiere una acción de la persona; con `useEffect` y `[]`, se ejecuta automáticamente al montar la pantalla.
