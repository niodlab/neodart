import React from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="aspect-[4/5] bg-white/5 border border-white/5" />
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 w-2/3 bg-white/5 rounded" />
          <div className="h-6 w-1/4 bg-white/5 rounded" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 w-1/3 bg-white/5 rounded" />
          <div className="h-4 w-1/4 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
