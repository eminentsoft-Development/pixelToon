const QuickActions = () => {
  const actions = [
    { name: "Create Course", color: "bg-blue-600", icon: "+" },
    { name: "Write Blog", color: "bg-emerald-600", icon: "✎" },
    { name: "New Poster", color: "bg-amber-600", icon: "🖼️" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {actions.map((action) => (
        <button
          key={action.name}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all font-semibold text-sm text-gray-700"
        >
          <span className={`w-6 h-6 flex items-center justify-center rounded-md text-white ${action.color}`}>
            {action.icon}
          </span>
          {action.name}
        </button>
      ))}
    </div>
  );
};

export default QuickActions