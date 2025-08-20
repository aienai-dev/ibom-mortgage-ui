import { FaHandshake, FaHome, FaUsers, FaMoneyBill } from "react-icons/fa";

const AboutSection = () => (
  <section className="bg-white py-20 px-4 md:px-16">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="text-gray-800">
        <h2 className="text-4xl font-bold font-sans">
          We're a trusted name in
          <span className="text-primary-orange pl-2">real estate finance.</span>
        </h2>
        <p className="mt-4 text-lg">
          For over two decades, Ibom Mortgage Bank has been a cornerstone of
          trust, helping thousands of Nigerians secure their homes with dignity
          and ease. Our commitment is to transparency, integrity, and putting
          our clients first.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="bg-primary-orange text-white py-3 px-6 rounded-full font-bold hover:bg-opacity-90 transition-opacity">
            Learn More
          </button>
          <button className="bg-transparent border border-primary-orange text-primary-orange py-3 px-6 rounded-full font-bold hover:bg-primary-orange hover:text-white transition-colors">
            Contact Us
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-primary-orange transition-shadow">
          <FaHandshake className="text-4xl text-primary-orange mb-4" />
          <h3 className="text-xl font-bold mb-2">Flexible Mortgages</h3>
          <p className="text-sm text-gray-600">
            Tailored plans to suit your financial needs.
          </p>
        </div>
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-primary-orange transition-shadow">
          {/* <FaMoneyBillTrendUp className="text-4xl text-primary-orange mb-4" /> */}
          <FaMoneyBill className="text-4xl text-primary-orange mb-4" />
          <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
          <p className="text-sm text-gray-600">
            Our professionals guide you every step of the way.
          </p>
        </div>
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-primary-orange transition-shadow">
          <FaUsers className="text-4xl text-primary-orange mb-4" />
          <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
          <p className="text-sm text-gray-600">
            Client satisfaction is our top priority.
          </p>
        </div>
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-primary-orange transition-shadow">
          <FaHome className="text-4xl text-primary-orange mb-4" />
          <h3 className="text-xl font-bold mb-2">Extensive Listings</h3>
          <p className="text-sm text-gray-600">
            Access to a wide portfolio of properties.
          </p>
        </div>
      </div>
    </div>
  </section>
);
export default AboutSection;
