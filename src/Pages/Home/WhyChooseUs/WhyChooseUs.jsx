import { FaUmbrella } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: "01",
      title: "100% Safe Your Money",
      desc: "Your investments and policies are fully protected with our trusted insurance system, ensuring long-term financial security for you and your family.",
    },
    {
      id: "02",
      title: "Anytime Money Back",
      desc: "We offer a hassle-free money-back guarantee. If you’re not satisfied, you can withdraw your funds anytime with complete transparency.",
    },
    {
      id: "03",
      title: "Professional Company",
      desc: "Our team consists of experienced professionals who provide expert advice and world-class insurance solutions tailored to your needs.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 mx-auto px-6  grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
        
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-2 mb-10">
            Why you should choose <br /> our insurance policy.
          </h2>

          <div className="space-y-10 relative">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                {/* Number Circle + Line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {feature.id}
                  </div>
                  {index !== features.length - 1 && (
                    <div className="w-px flex-1 bg-primary"></div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar Section */}
          <div className="mt-12">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Trust
            </h4>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-3 w-[90%] rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Trusted by 90% of our clients worldwide</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <img
            src="https://wp.validthemes.net/urane/wp-content/uploads/2024/10/5-3.jpg"
            alt="Team working"
            className="rounded-lg shadow-md"
          />

       
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
