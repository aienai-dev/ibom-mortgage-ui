import { FaArrowRight } from "react-icons/fa";
// import vid from "../../assets/images/"

const HeroSection = () => (
  <section className="relative h-screen w-full flex items-center justify-center text-center text-light-text overflow-hidden">
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      src="https://res.cloudinary.com/fullstack-login-register/video/upload/v1755634036/video_jnmc7y.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="absolute top-0 left-0 w-full h-full bg-dark-bg bg-opacity-70 z-1"></div>
    <div className="relative z-20 max-w-4xl px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide font-sans">
        Find Your Dream Home With{" "}
        <span className="text-primary-orange">Ease</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl font-light">
        We provide flexible and affordable mortgage solutions to make
        homeownership a reality for you.
      </p>
      <button className="mt-10 bg-primary-orange text-white py-4 px-8 rounded-full font-bold hover:bg-opacity-90 transition-opacity flex items-center gap-2 mx-auto">
        Express interest <FaArrowRight />
      </button>
    </div>
  </section>
);

export default HeroSection;
