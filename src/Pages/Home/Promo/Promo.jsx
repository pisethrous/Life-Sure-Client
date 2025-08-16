import React from "react";
import promoImg from "../../../assets/promo.png"; 
import { Link } from "react-router";
const Promo = () => {
  return (
    <section className="  bg-[#E2E7EE]">
      <div className="w-11/12 mx-auto flex lg:flex-row flex-col-reverse items-center  justify-around">
        
     

        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
            Secure Your Family’s Future with{" "} <br />
            <span className="text-primary">LifeSure Insurance</span>
          </h2>
          <p className="text-base md:text-lg text-base-content/80">
            Get peace of mind knowing your loved ones are financially protected. <br /> 
            Our flexible plans cover you at every stage of life — with simple, transparent policies and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={'/allPolicies'}>
                <button className="px-4 py-2 btn-wide text-primary bg-secondary rounded hover:bg-transparent hover:border hover:border-primary hover:text-primary">
                  Get a Free Quote
                </button>
            </Link>
            <Link to={'/allPolicies'}>
                <button className="btn btn-outline btn-primary btn-wide">
                  Learn More
                </button>
            </Link>
          </div>
        </div>
           {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={promoImg}
         className="w-[450px]"
            alt="Life Insurance Promotion"
            
          />
        </div>
      </div>
    </section>
  );
};

export default Promo;
