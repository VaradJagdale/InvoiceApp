import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">InvoiceApp</h1>
      <div className="links">
        <Link to="/" className="nav-link">Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;


