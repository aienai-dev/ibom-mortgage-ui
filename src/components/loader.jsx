import React from "react";
import { BallTriangle, Oval } from "react-loader-spinner";

export const PageLoader = () => (
  <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
);

const Loader = ({ color, size }) => {
  return (
    <Oval
      height={size[1]}
      width={size[0]}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#e78c9549"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
