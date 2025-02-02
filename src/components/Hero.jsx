const Hero = () => {
    return (
      <div className="hero">
        <div className="blockchain-grid"></div>
        <div className="hero-content">
          <h1 className="hero-title animate__animated animate__fadeIn">
            The Future of <span style={{ color: 'var(--accent)' }}>AI</span> & 
            <span style={{ color: 'var(--accent-alt)' }}>Blockchain</span>
          </h1>
          <p className="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
            Experience the convergence of artificial intelligence and blockchain technology. 
            Our platform combines advanced AI agents with decentralized systems to create 
            a secure, transparent, and intelligent ecosystem.
          </p>
          <div className="cta-container">
            <Link to="/playground" 
              className="cta-button cta-primary animate__animated animate__fadeIn animate__delay-2s">
              Start Exploring
            </Link>
            <Link to="/profiles" 
              className="cta-button cta-secondary animate__animated animate__fadeIn animate__delay-2s">
              View AI Agents
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;