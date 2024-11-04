import { SearchBar, TaskForm, TaskList } from '../components';

export default function Todo() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <SearchBar />
      <TaskForm />
      <TaskList />
    </div>
  );
}
