export function SkeletonGrid({ view }) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          : "flex flex-col gap-2"
      }
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 animate-pulse rounded-xl ${
            view === "grid" ? "aspect-[4/3] w-full" : "h-20 w-full"
          }`}
        />
      ))}
    </div>
  );
}
