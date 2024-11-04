import { create } from 'zustand';
import { Task } from '../types/Task';
import { nanoid } from 'nanoid';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string, dueDate: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

export const useTodoStore = create<TaskStore>(set => ({
  tasks: [],
  addTask: (title, description, dueDate) =>
    set(state => ({
      tasks: [
        ...state.tasks,
        { id: nanoid(), title, description, dueDate, status: 'Pending' },
      ],
    })),
  updateTask: (id, updatedTask) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    })),
  deleteTask: id =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id),
    })),
}));
