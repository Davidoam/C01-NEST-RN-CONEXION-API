# Ejercicio 12 · Creature Lab

Repaso de listado, búsqueda por ID y modificación de likes.

## Rutas de la API

- `GET /criaturas`: devuelve todas las criaturas.
- `GET /criaturas/:id`: devuelve una criatura por su ID.
- `PATCH /criaturas/:id/like`: incrementa y devuelve sus likes.

## Recorrido del dato

El servicio mantiene el array temporal. El controlador expone sus operaciones mediante rutas HTTP. La app usa `fetch()` y convierte la respuesta JSON en objetos; los guarda en estado y React pinta ese estado. Buscar o dar like repite el ciclo petición → respuesta → estado → pantalla.

## Ejecutar

Abre dos terminales desde `EJERCICIO-12`.

Backend:

```powershell
cd backend
npm.cmd run start:dev
```

Frontend:

```powershell
cd frontend
npm.cmd run start
```

La app usa `http://172.23.144.1:3000` como dirección del backend. Si cambia la IP local, actualiza `API_URL` en `frontend/App.tsx`.

## Prueba manual

1. Comprueba que aparecen Flamitas, Burbú y Rayín.
2. Busca los IDs `1`, `2` y `3`; prueba también uno inexistente.
3. Da like a una criatura y comprueba que el contador actualizado aparece en la ficha y en el listado.
