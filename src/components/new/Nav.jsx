import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Nav = () => (
  <header className=" w-full z-10 p-6">
    <nav className="flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-light-text font-serif">
        <img src={logo} alt="" className="h-[60px]" />
      </Link>
      <div className="flex  items-center justify-end gap-2 sm:text-[16px] text-[12px] text-end flex-wrap text-light-text">
        <span>Already have an account?</span>
        <Link to="/login" className="text-primary-orange transition-colors">
          Sign In
        </Link>
      </div>
    </nav>
  </header>
);

export default Nav;
