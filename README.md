# Fan.Motion — Portfolio

Sitio estático (HTML/CSS/JS) + Supabase (cuentas, base de datos y archivos). Gratis con GitHub Pages + plan free de Supabase.

## Archivos
`index.html` · `style.css` · `app.js` · `config.js` · `supabase.sql`

## 1) Crear el backend (5 min)
1. Entrá a https://supabase.com, creá un proyecto.
2. **SQL Editor** → pegá `supabase.sql` (cambiá `TU_CORREO@gmail.com` por tu correo) → Run.
3. **Project Settings → API**: copiá *Project URL* y *anon public key* y pegalos en `config.js`.
4. **Authentication → URL Configuration**: en *Site URL* poné la URL de tu GitHub Pages.
   (Opcional: en Authentication → Providers → Email podés desactivar "Confirm email" para entrar sin verificar.)

## 2) Subir a GitHub
1. Creá un repositorio nuevo y subí todos estos archivos a la raíz.
2. **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. En 1–2 minutos queda en `https://TU_USUARIO.github.io/NOMBRE_REPO/`.

## 3) Usar el panel
1. En la web tocá **Ingresar → Registrarme** con el mismo correo que pusiste en `supabase.sql`.
2. Ese botón pasa a ser **Panel admin**: subí/eliminá videos e imágenes y mirá los pedidos con sus archivos de logo.
Cualquier otra persona puede registrarse, pero sin permisos de administrador.

## Notas
- Supabase free limita cada archivo a 50 MB (ajustable en Storage → Settings). Comprimí los videos (H.264, 1080p).
- Los logos de pago (Mercado Pago, Visa, PayPal, Binance, etc.) son insignias de texto. Para usar los logos oficiales, descargalos de cada marca y reemplazá los `<span class="pb">` en `index.html`.
- La anon key es pública a propósito: la seguridad la dan las políticas RLS de `supabase.sql`.


## Videos rápidos (importante)
Los videos de celular o de editores suelen tener el índice al final del archivo y por eso tardan en arrancar en la web.
1. Instalá ffmpeg (`brew install ffmpeg` en Mac, `winget install ffmpeg` en Windows).
2. Copiá `herramientas/optimizar-videos.bat` (Windows) o `.sh` (Mac) junto a tus videos y ejecutalo.
3. Subí desde el panel los videos de la carpeta `optimizados` (H.264, máx. 1080p, calidad CRF 21 casi idéntica y con arranque inmediato).
Al subir un video, la página crea sola una miniatura para mostrarlo al instante. Para eso ejecutá en Supabase la última línea de `supabase.sql` (`add column ... poster`).

## Logos de pago
Están dibujados como SVG dentro de `index.html`. Para usar los logos oficiales de cada marca, reemplazá el `<svg class="lg">` correspondiente por `<img class="lg" src="assets/pay/archivo.svg" alt="...">`.
