import { forwardRef, useState } from 'react';
import { Task as TaskType } from '../types';
import { GripVertical, Pencil, Trash2, X, Check, Palette } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';

interface Props {
  task: TaskType;
  columnId: string;
}

const colorOptions = [
  { name: 'Blanco', value: 'bg-white' },
  { name: 'Verde claro', value: 'bg-green-50' },
  { name: 'Azul claro', value: 'bg-blue-50' },
  { name: 'Rojo claro', value: 'bg-red-50' },
  { name: 'Amarillo claro', value: 'bg-yellow-50' },
  { name: 'Morado claro', value: 'bg-purple-50' }
];

export const Task = forwardRef<HTMLDivElement, Props>(({ task, columnId, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { updateTask, deleteTask } = useBoardStore();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('es', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(columnId, task.id, {
        title: editTitle,
        description: editDescription || undefined
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    deleteTask(columnId, task.id);
  };

  const handleColorChange = (color: string) => {
    updateTask(columnId, task.id, { color });
    setShowColorPicker(false);
  };

  if (isEditing) {
    return (
      <div
        ref={ref}
        {...props}
        className={`${task.color || 'bg-white'} p-4 rounded shadow-md`}
      >
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleSave}
              className="p-1 text-green-500 hover:text-green-700"
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      {...props}
      className={`${task.color || 'bg-white'} p-4 rounded shadow-sm hover:shadow-md transition-shadow group relative`}
    >
      <div className="flex items-start gap-2">
        <div className="mt-1 text-gray-400 cursor-grab">
          <GripVertical size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{task.title}</h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Palette size={14} />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <span>{formatDate(task.createdAt)}</span>
            <span>•</span>
            <span>{task.createdBy}</span>
            {task.lastEdited && (
              <>
                <span>•</span>
                <span>Editado: {formatDate(task.lastEdited)}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {showColorPicker && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10 p-2">
          <div className="grid grid-cols-2 gap-1">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`${color.value} p-2 rounded hover:opacity-80 text-xs text-gray-600 w-full`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

Task.displayName = 'Task';