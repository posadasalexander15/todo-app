import { useState, useEffect, useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export default function SearchBar() {
  const { tasks } = useTodoStore();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [tasks, debouncedQuery]);

  return (
    <div className='mb-5'>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search tasks by title..."
        className="w-full p-2 mb-4 border text-sm"
        aria-label="Search tasks by title"
      />
      {filteredTasks.map(task => (
        <div key={task.id} className="p-1 text-sm mb-1">
          <p>{task.title}</p>
        </div>
      ))}
    </div>
  );
}
