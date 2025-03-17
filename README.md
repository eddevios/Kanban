# Kanban Board con React y TypeScript

Una aplicación de tablero Kanban moderna y funcional construida con React, TypeScript y Tailwind CSS. Permite gestionar tareas con una interfaz de arrastrar y soltar, edición en línea, personalización visual y autenticación de usuarios.

## 🚀 Características

- ✨ Interfaz de usuario moderna y responsive
- 🎯 Arrastrar y soltar tareas entre columnas
- 📝 Edición en línea de tareas
- 🎨 Personalización de colores para las tareas
  - Colores vibrantes con alto contraste
  - Paleta de colores: Morado, Turquesa, Coral, Índigo, Esmeralda, Ámbar
- 🌓 Modo oscuro persistente por usuario
- ⏰ Registro de fechas de creación y edición
- 💾 Persistencia de datos
  - Tareas guardadas localmente
  - Preferencias de usuario
  - Tema oscuro/claro
- 👤 Sistema completo de autenticación
  - Registro con email y contraseña
  - Inicio de sesión con email y contraseña
  - Autenticación con Google
  - Gestión de perfil de usuario
- 📱 Diseño adaptable a diferentes dispositivos

## 🛠️ Tecnologías

- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Vite**: Bundler y dev server
- **Tailwind CSS**: Framework de estilos
- **Zustand**: Gestión de estado
- **@hello-pangea/dnd**: Funcionalidad de arrastrar y soltar
- **Lucide React**: Iconos
- **Supabase**: Backend as a Service para autenticación y base de datos
- **React Router**: Navegación y rutas protegidas

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v7 o superior)
- Cuenta en Supabase (gratuita)

## 🔧 Configuración de Supabase

1. Crear una cuenta en [Supabase](https://supabase.com)
2. Crear un nuevo proyecto
3. En la sección "Authentication" > "Providers":
   - Habilitar "Email"
   - Habilitar "Google" y configurar OAuth:
     - Crear proyecto en [Google Cloud Console](https://console.cloud.google.com)
     - Configurar OAuth 2.0
     - Añadir URLs de redirección de Supabase
4. Copiar las credenciales del proyecto:
   - Project URL
   - Project API Key (anon, public)
5. Crear archivo `.env` en la raíz del proyecto:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

## 🚀 Instalación y Ejecución

### Desarrollo local

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd kanban-board
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (ver sección anterior)

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

### Docker

1. Construir la imagen:
```bash
docker build -t kanban-board .
```

2. Ejecutar el contenedor:
```bash
docker run -p 4173:4173 -e VITE_SUPABASE_URL=tu_url -e VITE_SUPABASE_ANON_KEY=tu_clave kanban-board
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Auth/           # Componentes de autenticación
│   │   ├── Login.tsx   # Vista de inicio de sesión
│   │   ├── SignUp.tsx  # Vista de registro
│   │   └── Settings.tsx # Vista de ajustes de cuenta
│   ├── AddTask.tsx     # Formulario para añadir tareas
│   ├── Column.tsx      # Columna del tablero
│   ├── Task.tsx        # Componente de tarea
│   └── UserMenu.tsx    # Menú de usuario
├── lib/
│   └── supabase.ts     # Cliente de Supabase
├── store/              
│   ├── authStore.ts    # Estado de autenticación
│   ├── boardStore.ts   # Estado del tablero
│   └── themeStore.ts   # Estado del tema
├── types.ts            # Tipos TypeScript
├── App.tsx             # Componente principal
└── main.tsx           # Punto de entrada
```

## 💻 Flujo de Autenticación

### Registro de Usuario

1. Acceder a `/signup`
2. Completar formulario con email y contraseña
3. Al registrarse:
   - Se crea cuenta en Supabase
   - Se redirige al tablero
   - Se mantiene la sesión

### Inicio de Sesión

1. Acceder a `/login`
2. Opciones disponibles:
   - Email y contraseña
   - Botón de Google
3. Al autenticarse:
   - Se crea sesión
   - Se redirige al tablero
   - Se mantiene estado en `authStore`

### Gestión de Sesión

- Estado global con Zustand
- Persistencia automática
- Rutas protegidas
- Cierre de sesión desde menú

## 🔒 Seguridad

- Autenticación manejada por Supabase
- Tokens JWT seguros
- Sesiones persistentes
- Rutas protegidas con `PrivateRoute`
- HTTPS en producción

## 🐳 Docker

El proyecto incluye un Dockerfile para facilitar el despliegue:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]
```

### Variables de Entorno en Docker

Las variables de entorno se pueden pasar al contenedor de varias formas:

1. Usando el flag `-e`:
```bash
docker run -p 4173:4173 \
  -e VITE_SUPABASE_URL=tu_url \
  -e VITE_SUPABASE_ANON_KEY=tu_clave \
  kanban-board
```

2. Usando un archivo `.env`:
```bash
docker run -p 4173:4173 --env-file .env kanban-board
```

### Docker Compose

También puedes usar Docker Compose para una configuración más mantenible:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "4173:4173"
    env_file:
      - .env
```

Y ejecutarlo con:
```bash
docker-compose up
```

## 🚀 Despliegue

La aplicación puede desplegarse en:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Pasos para despliegue:

1. Construir la aplicación:
```bash
npm run build
```

2. Configurar variables de entorno en plataforma:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. Configurar redirecciones para SPA

## 🔧 Personalización

### Tema Oscuro/Claro

- Implementado con Zustand y persistencia
- Cambio desde menú de ajustes
- Persiste por usuario
- Afecta a toda la aplicación

### Colores de Tareas

Paleta de colores vibrantes disponible:
- Morado: Elegante y profundo
- Turquesa: Brillante y refrescante
- Coral: Vibrante y cálido
- Índigo: Profundo y llamativo
- Esmeralda: Natural y vibrante
- Ámbar: Cálido y energético

## 📝 Licencia

MIT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request