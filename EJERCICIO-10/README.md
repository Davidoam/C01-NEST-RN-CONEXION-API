# Ejercicio 10 · Likes

La pantalla carga a Rocky con `GET /mascotas/1`. El botón “Me gusta” envía `PATCH /mascotas/1/like`; el backend incrementa los likes y devuelve la mascota actualizada.

## Estructura

- `backend/src/mascotas/mascotas.service.ts`: guarda las mascotas y actualiza el contador.
- `backend/src/mascotas/mascotas.controller.ts`: expone las rutas GET y PATCH.
- `frontend/src/app/index.tsx`: muestra la mascota y actualiza el contador con la respuesta del PATCH.

## Ejecutar

Abre dos terminales desde `EJERCICIO-10`.

Backend:

```powershell
cd backend
npm.cmd run start:dev
```

Frontend:

```powershell
cd frontend
npm.cmd run web -- --port 8082 --localhost
```

La app apunta a `http://172.23.144.1:3000`. Si cambia la IP local del ordenador, actualiza `API_URL` en `App.tsx` y `src/app/index.tsx`. Para el emulador Android puedes usar `http://10.0.2.2:3000`.

## Checkpoints

1. Consulta `GET http://localhost:3000/mascotas/1` y observa que Rocky empieza con cero likes.
2. Pulsa “Me gusta”; el contador debe subir y el backend devuelve el valor actualizado.
3. Comprueba en la pestaña Network que la acción usa PATCH y no GET.

## Pregunta

¿Por qué usar PATCH y no GET para dar like? GET es para leer; PATCH indica que se modifica un recurso existente. Así, una recarga o caché de GET no repite la acción por accidente.
