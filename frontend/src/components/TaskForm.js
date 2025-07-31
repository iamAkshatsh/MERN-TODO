import { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit(title, dueDate);
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row gap-3">
     <textarea
  placeholder="Enter task here..."
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="p-3 h-28 rounded-md flex-1 resize-none bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full font-semibold transition shadow-md"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
