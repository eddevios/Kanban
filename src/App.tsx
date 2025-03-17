import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './components/Column';
import { useBoardStore } from './store/boardStore';
import { UserMenu } from './components/UserMenu';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { SignUp } from './components/Auth/SignUp';
import { Settings } from './components/Auth/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function KanbanBoard() {
  const { board, moveTask, reorderTasks } = useBoardStore();
  const { isDarkMode } = useThemeStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      reorderTasks(source.droppableId, source.index, destination.index);
      return;
    }

    moveTask(source.droppableId, destination.droppableId, draggableId);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} p-8`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Mi Tablero Kanban
        </h1>
        <UserMenu />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <KanbanBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App