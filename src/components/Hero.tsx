"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";

export default function HeroSection() {
  const controls = useAnimation();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    console.log("clicke");
    setClicked(!clicked);
    controls.start({
      clipPath: [
        "polygon(34% 63%, 100% 43%, 100% 100%, 0 100%, 0 52%)", // start
        "polygon(34% 63%, 100% 43%, 100% 100%, 0 100%, 0 0)", // mid state
        "polygon(34% 63%, 100% 43%, 100% 100%, 0 100%, 100% 43%)", // final
      ],
      transition: {
        duration: 1.2,
        ease: [0.68, -0.55, 0.265, 1.55], // easeOutBack
      },
    });
  };

  return (
    <div className="h-[90dvh] border-2 mt-10 relative">
      <motion.div
        animate={controls}
        initial={{
          clipPath: "polygon(34% 63%, 100% 43%, 100% 100%, 0 100%, 0 52%",
        }}
        className="bg-red-400 h-full w-ful"
      />
      <div className="absolute top-50 left-[50%] transform: translate-x-[-50%]">
        Hello {"  "}
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Animate Clip Path
        </button>
        <motion.div
          variants={{
            initial: { opacity: 1, rotate: 0 },
            transition: { opacity: 0 },
          }}
          className="mt-10"
        >
          Animate text........
        </motion.div>
      </div>
    </div>
  );
}
