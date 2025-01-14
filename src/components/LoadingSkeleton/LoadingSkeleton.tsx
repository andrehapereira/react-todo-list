export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-8 animate-pulse">
      <div role="status" className="flex-1">
        <div className="h-5 bg-gray-300 rounded-md w-48 mb-4"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
      </div>
      <div role="status" className="flex-1">
        <div className="h-5 bg-gray-300 rounded-md w-48 mb-4"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
        <div className="h-16 bg-gray-300 rounded-md mb-2.5"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
