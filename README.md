# Corredor de Valores · Preparación (SMV Panamá)

App en React para estudiar y practicar el Examen General Básico (licencia de Corredor de Valores y Analista), construida a partir de la carpeta `../Material`.

## Uso

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
npm run build    # versión estática en dist/
```

## Secciones

- **Panel**: preparación estimada, racha, avance por sección y siguiente paso recomendado.
- **Estudiar**: las 12 secciones del temario (A–L) en lecciones con tablas, fórmulas y puntos clave.
- **Practicar**: preguntas por tema con explicación y fuente (artículo/acuerdo) al instante.
- **Simulacro**: Examen de Práctica Legal (50), Financiero (96) o simulacro mixto cronometrado; aprueba con 70%.
- **Tarjetas**: repetición espaciada (Leitner) de cifras, plazos y fórmulas.
- **Calculadoras**: hoja de fórmulas, bonos (precio/YTM/YTC), valor del dinero, cupón corrido, opciones con gráfico, acciones/convertibles, portafolio, CAPM/Sharpe y divisas.
- **Mis errores**: preguntas falladas, marcadas y las que conviene verificar con el texto oficial.

El progreso se guarda en el `localStorage` del navegador y, si inicias sesión, también en Supabase para usarlo en cualquier dispositivo.

## Sincronización con Supabase (opcional)

1. Crea un proyecto en https://supabase.com.
2. En **SQL Editor**, ejecuta `supabase/schema.sql` (crea la tabla `progress` con Row Level Security).
3. En **Authentication → URL Configuration**:
   - **Site URL**: la URL de Vercel (p. ej. `https://cert-corredor.vercel.app`).
   - **Redirect URLs**: agrega esa URL y `http://localhost:5173`.
4. En **Project Settings → API**, copia la *Project URL* y la llave *anon public*:
   - Local: copia `.env.example` como `.env.local` y complétalo.
   - Vercel: **Settings → Environment Variables** → `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, y vuelve a desplegar.
5. (Opcional) Para que el correo incluya también un código de 6 dígitos, en **Authentication → Email Templates → Magic Link** agrega `{{ .Token }}` a la plantilla.

Nunca uses la llave `service_role` en esta app.

## Notas sobre las respuestas

Los PDF de práctica no traen clave. Las respuestas se resolvieron con la Ley del Mercado de Valores (Texto Único) y los Acuerdos 2-2011, 5-2014, 6-2015 y 1-2026. Las preguntas con cifras desactualizadas se ajustaron a la norma vigente (etiqueta **Actualizada**) y las que dependen de normas que no están en la carpeta (p. ej. Acuerdo 5-2004) llevan la etiqueta **Verificar**.
