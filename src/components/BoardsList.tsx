import React from 'react';
import { useBoards } from '../hooks/useBoards';
import { formatDistanceToNow } from 'date-fns';

export const BoardsList = () => {
  const { data: boards, error, isLoading } = useBoards();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 h-20 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
        Error: {error.message}
      </div>
    );
  }

  if (!boards?.length) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No boards found. Create your first board to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {boards.map((board) => (
        <div
          key={board.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {board.title || 'Untitled Board'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated {formatDistanceToNow(new Date(board.updated_at || ''), { addSuffix: true })}
              </p>
            </div>
            {board.thumbnail && (
              <img
                src={board.thumbnail}
                alt={board.title || 'Board thumbnail'}
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};