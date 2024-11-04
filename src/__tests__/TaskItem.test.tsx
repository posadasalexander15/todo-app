import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task.',
  dueDate: '2023-10-30',
  status: 'Pending',
};

// Setup function to render TaskItem with props
const setup = (isEditing = false, editValues: Partial<Task> = {}) => {
  const onEditChange = jest.fn();
  const onSave = jest.fn();
  const onCancel = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  render(
    <TaskItem
      task={mockTask}
      isEditing={isEditing}
      editValues={editValues}
      onEditChange={onEditChange}
      onSave={onSave}
      onCancel={onCancel}
      onDelete={onDelete}
      onEdit={onEdit}
    /> as React.ReactElement // Type assertion
  );

  return { onEditChange, onSave, onCancel, onDelete, onEdit };
};

// Test suite for TaskItem component
describe('TaskItem Component', () => {
  test('renders task details when not editing', () => {
    setup();

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(`Due: ${mockTask.dueDate}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockTask.status}`)).toBeInTheDocument();
  });

  test('renders editing inputs when isEditing is true', () => {
    setup(true);

    expect(screen.getByPlaceholderText('Title')).toHaveValue(mockTask.title);
    expect(screen.getByPlaceholderText('Description')).toHaveValue(mockTask.description);
    expect(screen.getByDisplayValue(mockTask.dueDate)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTask.status)).toBeInTheDocument();
  });

  test('calls onEditChange when title input changes', () => {
    const { onEditChange } = setup(true);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
    expect(onEditChange).toHaveBeenCalledWith('title', 'Updated Task');
  });

  test('calls onSave when save button is clicked', () => {
    const { onSave } = setup(true);

    fireEvent.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const { onCancel } = setup(true);

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  test('calls onDelete when delete button is clicked', () => {
    const { onDelete } = setup();

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  test('calls onEdit when edit button is clicked', () => {
    const { onEdit } = setup();

    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalled();
  });
});
