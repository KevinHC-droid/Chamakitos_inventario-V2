# Inventario de tienda (PWA)

## IMPORTANTE: para que NO se vea la barra del navegador
La app solo se ve como app nativa si Android verifica que eres dueno de la pagina web (Digital Asset Links).
Eso exige que el archivo `/.well-known/assetlinks.json` este en la RAIZ del dominio. Por eso:

- Crea el repositorio con el nombre exacto `TU-USUARIO.github.io` (asi la app queda en `https://TU-USUARIO.github.io/`, sin subcarpeta).
- Si usas un repositorio normal (`.../inventario/`) la verificacion falla y Android muestra la barra de direcciones.

## 1. Subir a GitHub Pages
1. Crea el repositorio `TU-USUARIO.github.io` (publico).
2. Sube TODO el contenido de esta carpeta a la raiz: `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, el archivo `.nojekyll` y la carpeta `.well-known/`.
   (Si el navegador no deja subir carpetas/archivos que empiezan con punto: en GitHub usa Add file > Create new file y escribe `.well-known/assetlinks.json` y `.nojekyll`.)
3. Settings > Pages > Deploy from a branch > `main` / `(root)` > Save.
4. Abre `https://TU-USUARIO.github.io/` en Chrome del movil y comprueba que carga.

## 2. Generar el APK con PWABuilder
1. En https://www.pwabuilder.com pega `https://TU-USUARIO.github.io/`.
2. Package for stores > Android > Generate. Pon un Package ID propio (ej. `com.tunombre.inventario`).
3. Descarga el zip: trae el `.apk`, el keystore (GUARDALO, sin el no podras actualizar) y un `assetlinks.json` / la huella SHA-256.
4. Abre `.well-known/assetlinks.json` de este proyecto y reemplaza `package_name` por tu Package ID y la huella por la que te dio PWABuilder (o copia el contenido de su `assetlinks.json`). Subelo a GitHub.
5. Instala el APK. Al abrirlo debe verse a pantalla completa, sin barra de direcciones. (Si aun sale la barra, espera unos minutos tras subir assetlinks.json y reinstala; comprueba que `https://TU-USUARIO.github.io/.well-known/assetlinks.json` abre en el navegador.)

## Importar el Excel desde WhatsApp
Con la app instalada: en WhatsApp abre el Excel recibido > Compartir (o mantenlo pulsado > Compartir) > elige "Inventario". La app abre una ventana para confirmar la carga.
Tambien funciona compartiendo a la app el mensaje de "Compartir cierre". Si tu telefono no la lista, usa Mas > Importar Excel y elige el archivo desde Descargas/Documentos.

## Notas
- La primera vez necesita internet (carga las librerias de Excel); despues funciona sin conexion.
- Cada telefono guarda su propio inventario. Entre telefonos: Mas > Compartir cierre / Cargar cierre, o el Excel.
- Si cambias `index.html`, cambia `inventario-v2` por `inventario-v3` en `sw.js` para que los telefonos se actualicen.
