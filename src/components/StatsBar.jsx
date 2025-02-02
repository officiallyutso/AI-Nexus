const StatsBar = () => {
    const stats = [
      { value: '100K+', label: 'Active Users' },
      { value: '1M+', label: 'Transactions' },
      { value: '50+', label: 'AI Agents' },
      { value: '99.9%', label: 'Uptime' }
    ];
  
    return (
      <div className="stats-bar">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item" data-aos="fade-up" data-aos-delay={index * 100}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StatsBar;