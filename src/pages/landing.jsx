import React, { useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Quotebox from "../components/quoteBox";
import Accordion from "../components/accordion";
import Footer from "../components/footer";
import {
  faqData,
  images,
  navItems,
  quotes,
  application_stale_data,
  ui_data,
} from "../constants/static";
import img1 from "../assets/images/mg1.jpg";
// img2: "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102734/Tinubu_d8zuhq.svg",
import img2 from "../assets/images/mg2.png";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/carousel";
import HomeCard from "../components/homeCard";
import vector from "../assets/images/outdoor.jpg";
import vid from "../assets/images/video.mp4";
const { heroVideo } = ui_data;

const Landing = () => {
  const videoRef = useRef(null);
  const shadow =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1724160091/shadow_kbqtxb.svg";
  const { coat, heroBg } = images;
  const { card1, card2, card3 } = application_stale_data;
  const { quote1, quote2 } = quotes;
  // const bigScreen = window.innerWidth <= 1000;
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar navItems={navItems} action={login} actionName={"Log In"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "fit-content",
            padding: "0px 20px",
            justifyContent: "center",
          }}
          className="lg:grid-cols-2 mt-[100px]  flex gap-[40px] top-[40px] lg:flex-row flex-col-reverse "
        >
          <div className=" flex gap-[13px] items-center lg:gap-[22px] justify-center lg:items-end col-span-1 w-full">
            <div className="max-w-[304px] px-[20px] relative flex flex-col gap-[16px] lg:gap-[51px] w-full">
              <Quotebox text={quote1} />
              <div className="w-full max-w-[172px] flex mb-[27px] lg:mb-[98px] flex-col gap-[8px]">
                {/* <span className="py-[7px] px-[8px] w-full bg-[#fff] text-[#26A54D] font-[700] text-[10px] md:text-[14px]">
                  HON. OYETUNDE OJO
                </span>
                <div className="flex flex-col">
                  <span className="font-[400] text-[10px] md:text-[14px] text-[#FAFAFA]">
                    Managing Director/CEO
                  </span>
                  <span className="font-[700] text-[10px] md:text-[14px] text-[#FAFAFA]">
                    Federal Housing Authority
                  </span>
                </div> */}
              </div>
              {/* <div className=""></div> */}
            </div>
            <img
              className="lg:w-full w-[180px] max-w-[250px] rounded-[40px] md:w-[250px] md:h-[400px] h-[294px] lg:h-full"
              src={img1}
              alt=""
            />
          </div>
          <div className=" flex gap-[13px] lg:gap-[22px] items-center lg:items-end justify-center col-span-1 w-full">
            <img
              className="lg:w-full max-w-[250px] rounded-[40px] w-[180px] md:w-[250px] md:h-[400px] h-[294px] lg:h-full"
              src={img2}
              alt=""
            />
            <div className=""></div>
            <div className="max-w-[304px] pt-[49px] lg:pt-[0px]  items-end px-[20px] relative flex flex-col gap-[16px] lg:gap-[33px] w-full">
              <div className="flex flex-col w-full items-end gap-[17px]">
                {/* <img
                  className="w-[46px] h-[46px] md:w-[74px] md:h-[74px]"
                  src={coat}
                  alt=""
                /> */}
                <Quotebox text={quote2} />
              </div>
              <div className="w-full flex mb-[20px] lg:mb-[60px] max-w-[184px]  flex-col gap-[8px]">
                <div className="flex w-full px-[8px] py-[7px] bg-[#fff] flex-col">
                  {/* <span className="font-[400] text-[8px] text-center text-[#26A54D]">
                    HIS EXCELLENCY
                  </span>
                  <div className="flex items-center gap-[3px]">
                    <span className="font-[700] text-[10px] md:text-[14px] text-[#26A54D]">
                      Bola Ahmed Tinubu
                    </span>
                    <span className="text-[8px] text-[#26A54D] font-[400]">
                      GCFR
                    </span>
                  </div> */}
                </div>
                {/* <div className="flex w-full flex-col">
                  <span className="font-400] text-right text-[10px] md:text-[14px] text-[#FAFAFA]">
                    President, Commandeer-In-Chief of the Armed Forces
                  </span>
                  <span className="font-[700] text-right text-[10px] md:text-[14px] text-[#FAFAFA]">
                    Federal Republic of Nigeria
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div id="section1" className="w-full">
          <InterestForm />
        </div> */}
        <div className="w-full flex flex-col justify-center pt-[70px] pb-[110px] items-center">
          <div className="max-w-[858px] px-[20px] w-full flex flex-col gap-[20px] justify-center items-center">
            <div id="ourPurpose" className="flex flex-col gap-[12px]">
              <span className="font-[600] text-center md:text-[16px] text-[10px] text-[#475467]">
                Our Purpose
              </span>
              <span className="font-[600] text-center md:text-[36px] text-[26px] text-[#030812]">
                Collecting Data to Shape Housing Policies and Meet National
                Needs
              </span>
            </div>
            <span className="font-[400] text-center text-[14px] md:text-[18px] text-[#475467]">
              Our mission is to gather comprehensive data on housing
              requirements to inform policy decisions, enhance housing programs,
              and ensure that every citizen has access to safe, affordable, and
              suitable housing.
            </span>
          </div>
          <div className="w-full flex items-center mt-[80px] mb-[36px] justify-center">
            {" "}
            <Carousel />
          </div>
          <div
            id="howItWorks"
            className="max-w-[1240px] mb-[100px] pt-[100px] px-[20px] w-full gap-[80px] flex flex-col"
          >
            <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[0px] w-full items-center justify-between">
              <div id="howItWorks" className="flex flex-col gap-[16px]">
                <span className="font-[600] text-[36px] text-[#030812]">
                  How It Works
                </span>
                <span className="font-[600] text-center md:text-left text-[16px] text-[#475467]">
                  Three (3) easy steps{" "}
                </span>
              </div>
              <span className="max-w-[820px] text-center md:text-start text-[18px] text-[400] text-[#475467]">
                By sharing your housing needs and preferences, you help shape
                the future of housing policies and programs that directly impact
                your community. Your input ensures that the real needs of
                residents are heard and addressed.
              </span>
            </div>
            <div className="md:grid md:grid-cols-2 flex flex-col lg:grid-cols-3 gap-[20px] w-full">
              <HomeCard cardData={card1} />
              <HomeCard cardData={card2} />
              <HomeCard cardData={card3} />
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${vector})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="min-h-[700px] items-center relative flex mb-[120px] w-full"
          >
            {/* <img
              className="absolute   top-0 left-0 right-0 w-full h-full"
              src={shadow}
              alt=""
            /> */}
            {/* <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="auto"
              className=" w-full h-full border absolute top-0 left-0 right-0"
              type="video/mp4"
            >
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <div className="flex px-[20px] z-[99999] max-w-[1240px] mx-auto flex-col relative h-full w-full gap-[80px]">
              <div className="flex md:ms-[100px] max-w-[600px]  w-fit flex-col gap-[12px]">
                <span className="text-[30px] md:text-[40px] text-center md:text-start font-[700] text-[#FFFFFF]">
                  Collecting Data to Shape Housing Policies and Meet National
                  Needs
                </span>
                <span className="font-[400] text-center md:text-start text-[14px] md:text-[18px] text-[#FFFFFF]">
                  Our mission is to gather comprehensive data on housing
                  requirements to inform policy decisions, enhance housing
                  programs, and ensure that every citizen has access to safe,
                  affordable, and suitable housing.
                </span>
              </div>
              <button
                onClick={() => navigate("/interest-form")}
                className="md:max-w-[218px] md:ms-[100px] flex justify-center items-center cursor-pointer w-full bg-[#FAFAFA] text-[#3D454E] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
              >
                Express Your Interest
              </button>
            </div>
          </div>
          <div className="max-w-[768px] w-full flex flex-col gap-[80px]">
            <div
              id="FAQ"
              className="flex flex-col w-full gap-[20px] justify-center items-center"
            >
              <span className="font-[600] md:text-[36px] text-[26px] text-[#030812]">
                Frequently Asked Questions
              </span>
              <span className="text-[14px] md:text-[18px] font-[400] text-[#475467]">
                Everything you need to know about us
              </span>
            </div>
            <Accordion data={faqData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
