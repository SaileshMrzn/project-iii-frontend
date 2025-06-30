"use client";

import { useState } from "react";
import { motion, Easing } from "motion/react";
import FilePicker from "./custom/FilePicker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function HeroSection() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitActive, setSubmitActive] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const [startAnimation, setStartAnimation] = useState(false);

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
        ease: [0.68, -0.55, 0.265, 1.55] as Easing,
      },
    },
    postSubmit: {
      clipPath: [
        "polygon(50% 54%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
        "polygon(50% 0%, 100% 40%, 100% 100%, 0 100%, 0 40%)",
        "polygon(50% 0%, 100% 0%, 100% 100%, 0 100%, 0 0%)",
        "polygon(50% 0, 100% 0, 100% 0, 0 0, 0 0)",
      ],
      transition: {
        duration: 1.5,
        ease: [0.68, -0.55, 0.265, 1.55] as Easing,
      },
    },
  };

  const uploadBtnVariants = {
    initial: { y: 20 },
    animate: {
      y: -120,
      transition: { duration: 0.5, ease: "easeInOut" as Easing, delay: 0.5 },
    },
    postSubmit: {
      y: -200,
      opacity: 0,
      transition: {
        ease: "easeInOut" as Easing,
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const textBoxVariants = {
    initial: { y: -200, opacity: 0 },
    animate: {
      y: -100,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0, 0, 0.265, 1.55] as Easing,
        delay: 0.5,
      },
    },
    postSubmit: {
      y: -200,
      opacity: 0,
      transition: {
        ease: "easeInOut" as Easing,
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  console.log(submitActive, "submit");

  return (
    <div className="h-[90dvh] border-2 mt-10 relative">
      {/* clip path */}
      {!animationComplete && (
        <motion.div
          variants={clipPathVariants}
          animate={
            submitActive ? "postSubmit" : startAnimation ? "animate" : "initial"
          }
          initial="initial"
          className={`bg-red-400 h-full w-full`}
          onAnimationComplete={(definition) => {
            if (definition === "postSubmit") {
              setAnimationComplete(true);
            }
          }}
        />
      )}

      {/* hero content/form... */}
      {!animationComplete && (
        <div
          className={`absolute top-[10%] left-[50%] transform: translate-x-[-50%] justify-center items-center flex flex-col text-center/*  */`}
        >
          <motion.h1
            variants={textVariants}
            initial="initial"
            className="text-[4rem]"
            animate={startAnimation ? "animate" : "initial"}
          >
            Finding Jobs Made Easier
          </motion.h1>

          <motion.p
            variants={textVariants}
            initial="initial"
            className="text-center"
            animate={startAnimation ? "animate" : "initial"}
          >
            Get personalized job recommendations
          </motion.p>

          <motion.div
            variants={uploadBtnVariants}
            initial="initial"
            animate={
              submitActive
                ? "postSubmit"
                : startAnimation
                ? "animate"
                : "initial"
            }
            className="flex justify-center"
          >
            <FilePicker setStartAnimation={setStartAnimation} />
          </motion.div>

          <motion.div
            variants={textBoxVariants}
            initial="initial"
            animate={
              submitActive
                ? "postSubmit"
                : startAnimation
                ? "animate"
                : "initial"
            }
            className="text-center w-[90%]"
          >
            <Textarea
              id="description"
              placeholder="Enter job description"
              className="min-h-24 max-h-32"
            />
          </motion.div>

          <motion.div
            variants={{
              ...textBoxVariants,
              initial: { ...textBoxVariants.initial, scale: 1 },
              animate: {
                ...textBoxVariants.animate,
                y: -80,
              },
              click: {
                scale: 0.9,
                transition: { ease: "backOut", duration: 0.3 },
              },
            }}
            initial="initial"
            animate={
              submitActive
                ? "postSubmit"
                : startAnimation
                ? "animate"
                : "initial"
            }
            whileTap="click"
            className="text-center"
          >
            <Button
              onClick={() => setSubmitActive(true)}
              className="cursor-pointer"
            >
              Submit
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
