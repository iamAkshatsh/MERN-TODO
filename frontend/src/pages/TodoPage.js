import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const config = useMemo(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      headers: { Authorization: `Bearer ${user?.token}` }
    };
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/tasks', config);
      setTasks(data.reverse());
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, [config]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title, dueDate) => {
    try {
      await axios.post('http://localhost:5000/tasks', { title, dueDate }, config);
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: true }, config);
      fetchTasks();
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, config);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const updateTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: editTitle,
        dueDate: editDueDate
      }, config);
      setEditTaskId(null);
      setEditTitle('');
      setEditDueDate('');
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <main className="max-w-3xl mx-auto p-4 mt-6 text-white">
      {/* Task Summary */}
      <div className="mb-4 text-sm text-gray-400 flex justify-between items-center">
        <span>Total: {total}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-4 text-sm">
        {['all', 'completed', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full border ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-400'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Form */}
      <TaskForm onSubmit={addTask} />

      {/* Task List */}
      <div className="space-y-4 mt-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to show.</p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task._id}
              className={`p-4 rounded-lg border shadow flex flex-col sm:flex-row sm:items-center justify-between transition ${
                task.completed
                  ? 'bg-green-900 text-green-300 border-green-700'
                  : 'bg-zinc-800 text-white border-zinc-700'
              }`}
            >
              <div className="flex flex-col gap-1 w-full sm:w-auto sm:flex-1">
                {editTaskId === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border px-2 py-1 rounded bg-zinc-700 text-white mb-2"
                    />
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="border px-2 py-1 rounded bg-zinc-700 text-white"
                    />
                  </>
                ) : (
                  <>
                    <div className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-gray-400">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 sm:mt-0">
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task._id)}
                    className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Complete
                  </button>
                )}

                {editTaskId === task._id ? (
                  <button
                    onClick={() => updateTask(task._id)}
                    className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditTaskId(task._id);
                      setEditTitle(task.title);
                      setEditDueDate(task.dueDate?.split('T')[0] || '');
                    }}
                    className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default TodoPage;
