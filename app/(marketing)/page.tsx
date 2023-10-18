import React from "react";
import Heading from "./_components/Heading";
import Hero from "./_components/Hero";

const MarketingPage = () => {
  return (
    <div className=" min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Hero />
      </div>
    </div>
  );
};

export default MarketingPage;