import { FaBrain, FaLink, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaBrain />,
      title: 'Advanced AI',
      description: 'Access cutting-edge AI models trained on diverse datasets, capable of understanding complex patterns and generating innovative solutions.'
    },
    // ... add other features
  ];

  return (
    <section className="features">
      <h2 className="section-title" data-aos="fade-up">Why Choose AINexus?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;