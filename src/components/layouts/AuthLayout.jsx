import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex ">
      <div className="w-screen h-screen  md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-xl  text-transparent  font-semibold bg-gradient-to-bl bg-clip-text from-green-800 via-purple-600 to-orange-600">
          Task Manager
        </h2>
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/src/assets/images/bg.jpg')] bg-center overflow-hidden bg-cover p-8">
        <img src={UI_IMG} className="w-64 lg:w-[90%] " />
      </div>
    </div>
  );
};

export default AuthLayout;
