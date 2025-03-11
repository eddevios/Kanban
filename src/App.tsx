import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './components/Column';
import { useBoardStore } from './store/boardStore';

function App() {
  const { board, moveTask, reorderTasks } = useBoardStore();

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
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Tablero Kanban</h1>
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

export default App;