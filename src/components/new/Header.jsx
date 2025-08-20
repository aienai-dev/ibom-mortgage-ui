import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Header = () => (
  <header className="absolute top-0 left-0 w-full z-10 p-6">
    <nav className="flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-light-text font-serif">
        <img src={logo} alt="" className="w-[150px]" />
      </Link>
      <div className="hidden md:flex items-center gap-8 text-light-text">
        <Link
          to="/about"
          className="hover:text-primary-orange transition-colors"
        >
          About
        </Link>
        <Link
          to="/services"
          className="hover:text-primary-orange transition-colors"
        >
          How it works
        </Link>
        <Link
          to="/contact"
          className="hover:text-primary-orange transition-colors"
        >
          Contact
        </Link>
        <button className="bg-primary-orange text-white py-2 px-6 rounded-full font-bold hover:bg-opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
