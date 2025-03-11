import { create } from 'zustand';
import { Board, Task } from '../types';

interface BoardState {
  board: Board;
  addTask: (columnId: string, title: string, description?: string) => void;
  moveTask: (fromColumnId: string, toColumnId: string, taskId: string) => void;
  reorderTasks: (columnId: string, startIndex: number, endIndex: number) => void;
  updateTask: (columnId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (columnId: string, taskId: string) => void;
}

const initialBoard: Board = {
  columns: [
    {
      id: 'todo',
      title: 'Por hacer',
      tasks: [
        {
          id: '1',
          title: 'Implementar autenticación',
          description: 'Añadir login con email y contraseña',
          createdAt: new Date(),
          createdBy: 'eddevios',
          color: 'bg-white'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'En progreso',
      tasks: []
    },
    {
      id: 'done',
      title: 'Completado',
      tasks: []
    }
  ]
};

export const useBoardStore = create<BoardState>((set) => ({
  board: initialBoard,
  addTask: (columnId, title, description) =>
    set((state) => ({
      board: {
        ...state.board,
        columns: state.board.columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: [
                  ...col.tasks,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    title,
                    description,
                    createdAt: new Date(),
                    createdBy: 'eddevios',
                    color: 'bg-white'
                  }
                ]
              }
            : col
        )
      }
    })),
  moveTask: (fromColumnId, toColumnId, taskId) =>
    set((state) => {
      const fromColumn = state.board.columns.find((col) => col.id === fromColumnId);
      const toColumn = state.board.columns.find((col) => col.id === toColumnId);
      
      if (!fromColumn || !toColumn) return state;

      const task = fromColumn.tasks.find((t) => t.id === taskId);
      if (!task) return state;

      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) => {
            if (col.id === fromColumnId) {
              return {
                ...col,
                tasks: col.tasks.filter((t) => t.id !== taskId)
              };
            }
            if (col.id === toColumnId) {
              return {
                ...col,
                tasks: [...col.tasks, task]
              };
            }
            return col;
          })
        }
      };
    }),
  reorderTasks: (columnId, startIndex, endIndex) =>
    set((state) => {
      const column = state.board.columns.find((col) => col.id === columnId);
      if (!column) return state;

      const newTasks = Array.from(column.tasks);
      const [removed] = newTasks.splice(startIndex, 1);
      newTasks.splice(endIndex, 0, removed);

      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) =>
            col.id === columnId ? { ...col, tasks: newTasks } : col
          )
        }
      };
    }),
  updateTask: (columnId, taskId, updates) =>
    set((state) => ({
      board: {
        ...state.board,
        columns: state.board.columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map((task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        ...updates,
                        lastEdited: updates.color ? undefined : new Date()
                      }
                    : task
                )
              }
            : col
        )
      }
    })),
  deleteTask: (columnId, taskId) =>
    set((state) => ({
      board: {
        ...state.board,
        columns: state.board.columns.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== taskId)
              }
            : col
        )
      }
    }))
}));