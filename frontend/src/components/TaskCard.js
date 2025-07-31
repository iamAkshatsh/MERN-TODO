import { Trash, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onComplete, onDelete }) => {
  return (
    <div className={`bg-zinc-800 p-4 rounded-lg mb-4 shadow-md border-l-4 ${task.completed ? 'border-green-500' : 'border-yellow-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.dueDate && (
            <p className="text-sm text-gray-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          )}
        </div>
        <div className="flex gap-2">
          {!task.completed && (
            <button onClick={() => onComplete(task._id)} className="text-green-400 hover:text-green-600">
              <CheckCircle size={20} />
            </button>
          )}
          <button onClick={() => onDelete(task._id)} className="text-red-400 hover:text-red-600">
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
