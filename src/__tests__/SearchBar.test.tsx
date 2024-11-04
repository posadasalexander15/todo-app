import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

// Custom render function to use the mock store
const renderWithStore = (ui: React.ReactElement) => {
  return render(ui);
};

// Test suite for SearchBar component
describe('SearchBar Component', () => {
  test('renders the input field', () => {
    renderWithStore(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search tasks by title...');
    expect(input).toBeInTheDocument();
  });

  test('filters tasks based on search query', () => {
    renderWithStore(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search tasks by title...');
    fireEvent.change(input, { target: { value: 'Test' } });
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Another Task')).not.toBeInTheDocument();
    expect(screen.queryByText('Something Else')).not.toBeInTheDocument();
  });

  test('debounces the search input', () => {
    jest.useFakeTimers();
    renderWithStore(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Search tasks by title...');
    
    fireEvent.change(input, { target: { value: 'Test' } });
    jest.advanceTimersByTime(300);

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
