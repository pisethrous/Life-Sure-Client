import React from "react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaUserShield,
  FaLaptop,
  FaCreditCard,
  FaRegClock,
  FaUserCircle,
} from "react-icons/fa";

const benefits = [
  {
    title: "Instant Quote Calculation",
    icon: <FaCalculator className="w-8 h-8 text-primary" />,
    description: "Get personalized insurance quotes instantly using our smart quote engine.",
  },
  {
    title: "Expert Agent Support",
    icon: <FaUserShield className="w-8 h-8 text-primary" />,
    description: "Licensed agents are ready to help you make the best decision.",
  },
  {
    title: "100% Online Application",
    icon: <FaLaptop className="w-8 h-8 text-primary" />,
    description: "Complete your insurance application entirely online in minutes.",
  },
  {
    title: "Secure Online Payments",
    icon: <FaCreditCard className="w-8 h-8 text-primary" />,
    description: "Make safe and encrypted payments through trusted gateways.",
  },
  {
    title: "Real-Time Claim Tracking",
    icon: <FaRegClock className="w-8 h-8 text-primary" />,
    description: "Track your insurance claims live and stay informed at every step.",
  },
  {
    title: "Personalized Dashboard Access",
    icon: <FaUserCircle className="w-8 h-8 text-primary" />,
    description: "Manage policies, track quotes, and more with your custom dashboard.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const LifeSureBenefits = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Why Choose <span className="text-primary">LifeSure?</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition duration-300"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LifeSureBenefits;
