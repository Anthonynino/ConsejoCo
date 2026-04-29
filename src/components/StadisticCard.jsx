function StadisticCard({stats, cols = 4}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-${cols} gap-4`}>
      {stats.map((stat, index) => (
        <div key={index} className="card bg-base-100 border border-base-200 shadow-sm p-4 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`text-xl ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-50 tracking-wider leading-none mb-1">{stat.label}</p>
              <h4 className="text-xl font-bold text-base-content leading-none">{stat.value}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StadisticCard