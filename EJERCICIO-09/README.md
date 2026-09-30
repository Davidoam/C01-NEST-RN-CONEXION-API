# Ejercicio 09 · Busca superhéroe

Escribe un ID en la app y consulta `GET /heroes/:id`. El frontend incorpora el valor del campo en la URL; Nest extrae el segmento con `@Param('id')` y lo convierte a número antes de buscar el héroe.

## Estructura

- `backend/src/heroes/heroes.service.ts`: contiene tres héroes y busca por ID.
- `backend/src/heroes/heroes.controller.ts`: publica la ruta dinámica `GET /heroes/:id`.
- `frontend/src/app/index.tsx`: pantalla activa de Expo Router con el campo de búsqueda y la ficha del héroe.

## Ejecutar

Abre dos terminales desde `EJERCICIO-09`.

Backend:

```powershell
cd backend
npm.cmd run start:dev
```

Frontend:

```powershell
cd frontend
npm.cmd start -- --web
```

La app apunta a `http://172.23.144.1:3000`. Si cambia la IP local del ordenador, actualiza `API_URL` en `App.tsx` y `src/app/index.tsx`. En un emulador Android puedes usar `http://10.0.2.2:3000`.

## Checkpoints

1. Abre `http://localhost:3000/heroes/1` y comprueba la respuesta JSON de Spider-Man.
2. En la app, busca los IDs `1`, `2` y `3`.
3. Prueba un ID que no exista y comprueba el mensaje de error.

## Pregunta

Sigue el valor `id` desde React Native hasta `@Param('id')`: `TextInput` actualiza el estado `id`, el `fetch` lo añade a la URL, `@Get(':id')` reconoce el segmento y `@Param('id')` lo extrae como texto. El controlador lo convierte con `Number(id)` antes de llamar al Service.
