import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          AI<span>Nexus</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/profiles" className="nav-link">Profiles</Link>
          <Link to="/playground" className="nav-link">Playground</Link>
          <Link to="/dev" className="nav-link">Development</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;