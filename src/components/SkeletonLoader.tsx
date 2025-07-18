import React from 'react';

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'image' | 'stats' | 'timeline';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-gray-200 dark:bg-slate-700 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 dark:bg-slate-600 rounded-lg mr-4" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4" />
                <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded" />
              <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-5/6" />
              <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-4/6" />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="bg-gray-200 dark:bg-slate-700 rounded-2xl p-6 animate-pulse">
            <div className="w-12 h-12 bg-gray-300 dark:bg-slate-600 rounded-lg mb-4" />
            <div className="h-8 bg-gray-300 dark:bg-slate-600 rounded w-16 mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-24" />
          </div>
        );

      case 'timeline':
        return (
          <div className="bg-gray-200 dark:bg-slate-700 rounded-2xl p-8 animate-pulse">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-300 dark:bg-slate-600 rounded-2xl mr-6" />
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-4/6" />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="bg-gray-200 dark:bg-slate-700 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-slate-600" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-gray-300 dark:bg-slate-600 rounded w-3/4" />
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-5/6" />
            </div>
          </div>
        );

      case 'text':
      default:
        return (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-4/6" />
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="mb-6">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;