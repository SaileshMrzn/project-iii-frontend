"use client";

import { useState } from "react";
import { motion, Easing } from "motion/react";

export default function HeroSection() {
  const [clicked, setClicked] = useState(false);

  const textVariants = {
    initial: { y: 0, opacity: 1, scale: 1 },
    animate: {
      y: -40,
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: 0.2,
        ease: "easeOut" as Easing,
        delay: 0.55,
      },
    },
  };

  const clipPathVariants = {
    initial: {
      clipPath: "polygon(50% 54%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
    },
    animate: {
      clipPath: [
        "polygon(50% 54%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
        "polygon(50% 0%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
        "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%, 0 0%)",
        "polygon(50% 54%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
      ],

      transition: {
        duration: 1.5,
        ease: [0.68, -0.55, 0.265, 1.55] as Easing, // easeOutBack
      },
    },
  };

  const uploadBtnVariants = {
    initial: { y: 0 },
    animate: {
      y: -120,
      transition: { duration: 0.5, ease: "easeInOut" as Easing, delay: 0.5 },
    },
  };

  const textBoxVariants = {
    initial: { y: -200, opacity: 0 },
    animate: {
      y: -60,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0, 0, 0.265, 1.55] as Easing,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="h-[90dvh] border-2 mt-10 relative">
      <motion.div
        variants={clipPathVariants}
        animate={clicked ? "animate" : "initial"}
        initial="initial"
        className="bg-red-400 h-full w-ful"
      />

      <div className="absolute bottom-10 left-[50%] transform: translate-x-[-50%]">
        <button
          onClick={() => setClicked(!clicked)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Animate Clip Path
        </button>
      </div>

      <div className="absolute top-30 left-[50%] transform: translate-x-[-50%]">
        <motion.h1
          variants={textVariants}
          initial="initial"
          className="text-[4rem]"
          animate={clicked ? "animate" : "initial"}
        >
          Finding Jobs Made Easier
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="initial"
          className="text-center"
          animate={clicked ? "animate" : "initial"}
        >
          Get personalized job recommendations
        </motion.p>

        <motion.p
          variants={uploadBtnVariants}
          initial="initial"
          animate={clicked ? "animate" : "initial"}
          className="text-center mt-4"
        >
          Upload btn
        </motion.p>

        <motion.p
          variants={textBoxVariants}
          initial="initial"
          animate={clicked ? "animate" : "initial"}
          className="text-center mt-4"
        >
          Text Field...
        </motion.p>
      </div>
    </div>
  );
}
