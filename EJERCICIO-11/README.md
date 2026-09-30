# Ejercicio 11 · Mini tienda

La pantalla consulta los productos con `GET /productos` y permite crear uno con `POST /productos`.

## Recorrido del objeto

1. El nombre y el precio se guardan en el estado del formulario.
2. Al añadir, se agrupan en un objeto y se serializan con `JSON.stringify`.
3. La petición POST envía el JSON con `Content-Type: application/json`.
4. Nest recibe el cuerpo en `@Body()`, el servicio asigna un ID y añade el producto a la lista.
5. La API devuelve el nuevo producto y la interfaz lo incorpora al listado.

## Ejecutar

Abre dos terminales desde `EJERCICIO-11`.

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

1. La lista inicial muestra Camiseta y Gorra.
2. Añade un producto con nombre y precio.
3. Comprueba que aparece en la lista y que la petición de creación usa POST.

## Pregunta

El formulario mantiene nombre y precio como valores independientes. Antes de enviarlos, los agrupa en un objeto; `JSON.stringify` lo convierte en texto JSON para el cuerpo HTTP. En Nest, `@Body()` recibe ese objeto ya interpretado para que el controlador lo pase al servicio.
