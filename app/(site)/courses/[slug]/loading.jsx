export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      {/* Skeleton for Breadcrumbs */}
      <div className="h-12 bg-gray-200 w-full mb-8" />
      
      <div className="px-4 lg:px-28 mx-auto">
        {/* Skeleton for Course Header */}
        <div className="h-64 bg-gray-200 rounded-3xl mb-8" />
        {/* Skeleton for Course Content */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 w-1/3 rounded" />
          <div className="h-4 bg-gray-200 w-full rounded" />
          <div className="h-4 bg-gray-200 w-5/6 rounded" />
        </div>
      </div>
    </div>
  );
}