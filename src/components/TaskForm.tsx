import React, { useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export default function TaskForm() {
  const { addTask } = useTodoStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, dueDate } = formData;
    const validationErrors = {
      title: '',
      description: '',
      dueDate: ''
    };

    if (!title) {
      validationErrors.title = 'Task title is required.';
    }

    if (!description) {
      validationErrors.description = 'Task description is required.';
    }

    if (!dueDate) {
      validationErrors.dueDate = 'Due date is required.';
    }

    if (validationErrors.title || validationErrors.description || validationErrors.dueDate) {
      setErrors(validationErrors);
      return;
    }

    addTask(title, description, dueDate);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4 mb-2">
      <div>
        <label className='text-sm mb-2'>Task Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          className={`w-full p-2 text-sm border ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      
      <div>
        <label className='text-sm mb-2'>Task Desription</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className={`w-full p-2 border text-sm ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      
      <div>
        <label className='text-sm mb-2'>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`w-full p-2 border text-sm ${errors.dueDate ? 'border-red-500' : ''}`}
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
      </div>

      <button type="submit" className="w-full p-2 bg-teal-500 border text-white">
        Add Task
      </button>
    </form>
  );
}
