import { Task, TaskStatus } from '../types/Task';

interface Props {
  task: Task;
  isEditing: boolean;
  editValues: Partial<Task>;
  onEditChange: (key: keyof Task, value: string | TaskStatus) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

export default function TaskItem({
  task,
  isEditing,
  editValues,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
  onEdit,
}: Props) {
  const isPastDue = new Date(task.dueDate) < new Date();

  return (
    <div className={`p-4 border mb-2 ${isPastDue && task.status !== "Completed" ? "bg-red-100 border-red-400" : "bg-white"}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editValues.title || task.title}
            onChange={(e) => onEditChange("title", e.target.value)}
            className="w-full p-2 mb-2 border"
            placeholder="Title"
          />
          <textarea
            value={editValues.description || task.description}
            onChange={(e) => onEditChange("description", e.target.value)}
            className="w-full p-2 mb-2 border"
            placeholder="Description"
          />
          <input
            type="date"
            value={editValues.dueDate || task.dueDate}
            onChange={(e) => onEditChange("dueDate", e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <select
            value={editValues.status || task.status}
            onChange={(e) => onEditChange("status", e.target.value as TaskStatus)}
            className="w-full p-2 mb-2 border"
          >
            {["Pending", "In Progress", "Completed"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button onClick={onSave} className="p-2 bg-green-500 text-white mr-2">Save</button>
          <button onClick={onCancel} className="p-2 bg-gray-500 text-white">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Status: {task.status}</p>
          <button onClick={onEdit} className="p-2 bg-blue-500 text-white mr-2">Edit</button>
          <button onClick={() => onDelete(task.id)} className="p-2 bg-red-500 text-white">Delete</button>
        </div>
      )}
    </div>
  );
};
