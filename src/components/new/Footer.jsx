import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer id="footer" className="bg-dark-bg text-gray-400 py-16 px-4 md:px-16">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-light-text mb-4">
          Ibom Mortgage Bank
        </h3>
        <p className="text-sm">
          Empowering homeownership through flexible and trusted financial
          solutions.
        </p>
        <div className="flex gap-4 mt-6">
          <a
            href="#"
            className="text-gray-400 hover:text-primary-orange transition-colors"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary-orange transition-colors"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/company/akwa-savings-and-loans-ltd/"
            className="text-gray-400 hover:text-primary-orange transition-colors"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-light-text mb-4">Quick Links</h4>
        <ul className="text-sm space-y-2">
          <li>
            <Link
              to="#about"
              className="hover:text-primary-orange transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="#services"
              className="hover:text-primary-orange transition-colors"
            >
              How It Works
            </Link>
          </li>

          <li>
            <Link
              to="#footer"
              className="hover:text-primary-orange transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold text-light-text mb-4">Contact</h4>
        <div className="flex items-center gap-3 text-sm mb-2">
          <FaPhone className="text-primary-orange" />
          <span>+234 908 897 8002</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <FaEnvelope className="text-primary-orange" />
          <span>info@ibommortgagebank.com</span>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
      &copy; 2024 Ibom Mortgage Bank. All rights reserved.
    </div>
  </footer>
);

export default Footer;
