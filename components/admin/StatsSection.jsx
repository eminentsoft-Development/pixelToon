const StatsSection = () => {
  const stats = [
    { label: "Active Courses", value: "24", growth: "+12%", icon: "📚" },
    { label: "Total Blogs", value: "142", growth: "+5%", icon: "✍️" },
    { label: "Success Stories", value: "89", growth: "+18%", icon: "🎓" },
    { label: "Site Visitors", value: "12.5k", growth: "+10%", icon: "🌐" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="p-2 bg-gray-50 rounded-lg text-xl">{stat.icon}</span>
            <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
              {stat.growth}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;