import { useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { Task, TaskStatus } from '../types/Task';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, updateTask, deleteTask } = useTodoStore();
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Task>>({});

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : task.status === filter,
  );

  const handleEditChange = (key: keyof Task, value: string | TaskStatus) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  const saveEdit = (id: string) => {
    if (editValues.title && editValues.description && editValues.dueDate) {
      updateTask(id, {
        title: editValues.title,
        description: editValues.description,
        dueDate: editValues.dueDate,
        status: editValues.status || "Pending",
      });
      setEditingTaskId(null);
      setEditValues({});
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select onChange={(e) => setFilter(e.target.value as TaskStatus)} className="p-2 border">
          {["All", "Pending", "In Progress", "Completed"].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          editValues={editValues}
          onEditChange={handleEditChange}
          onSave={() => saveEdit(task.id)}
          onCancel={() => setEditingTaskId(null)}
          onDelete={deleteTask}
          onEdit={() => {
            setEditingTaskId(task.id);
            setEditValues({ title: task.title, description: task.description, dueDate: task.dueDate, status: task.status });
          }}
        />
      ))}
    </div>
  );
}
