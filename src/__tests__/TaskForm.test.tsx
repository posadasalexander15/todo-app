import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../components/TaskForm';
import { useTodoStore } from '../store/useTodoStore';

// Mocking the useTodoStore hook
jest.mock('../store/useTodoStore', () => ({
  useTodoStore: jest.fn()
}));

describe('TaskForm Component', () => {
  let addTaskMock: jest.Mock;

  beforeEach(() => {
 
    addTaskMock = jest.fn();
    (useTodoStore as unknown as jest.Mock).mockReturnValue({ addTask: addTaskMock });
  });

  it('renders form inputs and submit button', () => {
    render(<TaskForm />);
 
    expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('displays error messages for empty required fields on submit', () => {
    render(<TaskForm />);

 
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

 
    expect(screen.getByText('Task title is required.')).toBeInTheDocument();
    expect(screen.getByText('Task description is required.')).toBeInTheDocument();
    expect(screen.getByText('Due date is required.')).toBeInTheDocument();
  });

  it('clears error messages when user types in input fields', () => {
    render(<TaskForm />);

 
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

 
    expect(screen.getByText('Task title is required.')).toBeInTheDocument();

 
    fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: 'New Task' } });
    
 
    expect(screen.queryByText('Task title is required.')).not.toBeInTheDocument();
  });

  it('calls addTask and clears form on successful submission', () => {
    render(<TaskForm />);

 
    fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Task Description'), { target: { value: 'Task description' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-12-31' } });

 
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

 
    expect(addTaskMock).toHaveBeenCalledWith('New Task', 'Task description', '2024-12-31');

 
    expect(screen.getByPlaceholderText('Task Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('Task Description')).toHaveValue('');
    expect(screen.getByLabelText('Due Date')).toHaveValue('');
  });
});
