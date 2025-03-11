# Kanban Board con React y TypeScript

Una aplicación de tablero Kanban moderna y funcional construida con React, TypeScript y Tailwind CSS. Permite gestionar tareas con una interfaz de arrastrar y soltar, edición en línea y personalización visual.

## 🚀 Características

- ✨ Interfaz de usuario moderna y responsive
- 🎯 Arrastrar y soltar tareas entre columnas
- 📝 Edición en línea de tareas
- 🎨 Personalización de colores para las tareas
- ⏰ Registro de fechas de creación y edición
- 👤 Sistema de usuarios básico
- 📱 Diseño adaptable a diferentes dispositivos

## 🛠️ Tecnologías

- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Vite**: Bundler y dev server
- **Tailwind CSS**: Framework de estilos
- **Zustand**: Gestión de estado
- **@hello-pangea/dnd**: Funcionalidad de arrastrar y soltar
- **Lucide React**: Iconos

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v7 o superior)

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd kanban-board
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── AddTask.tsx     # Formulario para añadir tareas
│   ├── Column.tsx      # Columna del tablero
│   └── Task.tsx        # Componente de tarea
├── store/              
│   └── boardStore.ts   # Estado global con Zustand
├── types.ts            # Tipos TypeScript
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 💻 Uso

### Gestión de Tareas

1. **Crear Tarea**:
   - Haz clic en "Añadir tarea" en cualquier columna
   - Rellena el título y descripción (opcional)
   - Confirma para crear la tarea

2. **Editar Tarea**:
   - Pasa el cursor sobre una tarea
   - Haz clic en el icono de lápiz
   - Modifica los campos necesarios
   - Guarda los cambios

3. **Mover Tareas**:
   - Arrastra cualquier tarea usando el icono de agarre
   - Suelta en la columna deseada
   - Las tareas se pueden reordenar dentro de la misma columna

4. **Cambiar Color**:
   - Pasa el cursor sobre una tarea
   - Haz clic en el icono de paleta
   - Selecciona un color del menú desplegable

### Estado Global

El estado se gestiona con Zustand, proporcionando una API simple:

```typescript
const { 
  board,          // Estado del tablero
  addTask,        // Añadir nueva tarea
  moveTask,       // Mover tarea entre columnas
  updateTask,     // Actualizar tarea existente
  deleteTask,     // Eliminar tarea
  reorderTasks    // Reordenar tareas en columna
} = useBoardStore();
```

## 🐳 Docker

Para ejecutar la aplicación en Docker:

1. Crea un Dockerfile:
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

2. Construye la imagen:
```bash
docker build -t kanban-board .
```

3. Ejecuta el contenedor:
```bash
docker run -p 4173:4173 kanban-board
```

## 🚀 Despliegue

La aplicación se puede desplegar en cualquier plataforma que soporte aplicaciones Node.js:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

El proceso de build genera archivos estáticos en la carpeta `dist`:
```bash
npm run build
```

## 🔧 Personalización

### Columnas
Modifica `boardStore.ts` para ajustar las columnas:

```typescript
const initialBoard: Board = {
  columns: [
    {
      id: 'todo',
      title: 'Por hacer',
      tasks: []
    },
    // Añade más columnas aquí
  ]
};
```

### Colores
Edita `colorOptions` en `Task.tsx` para cambiar la paleta de colores:

```typescript
const colorOptions = [
  { name: 'Blanco', value: 'bg-white' },
  // Añade más colores aquí
];
```

## 📝 Licencia

MIT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request