import { FC } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '../types';
import { Task } from './Task';
import { AddTask } from './AddTask';
import { useBoardStore } from '../store/boardStore';
import { useThemeStore } from '../store/themeStore';

interface Props {
  id: string;
  title: string;
  tasks: TaskType[];
}

export const Column: FC<Props> = ({ id, title, tasks }) => {
  const addTask = useBoardStore((state) => state.addTask);
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg min-w-[300px]`}>
      <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[200px] ${
              snapshot.isDraggingOver 
                ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                : isDarkMode ? 'bg-gray-800' : ''
            } transition-colors duration-200 rounded-md p-2`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Task
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    task={task}
                    columnId={id}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-4">
        <AddTask columnId={id} onAdd={(title, description) => addTask(id, title, description)} />
      </div>
    </div>
  );
};