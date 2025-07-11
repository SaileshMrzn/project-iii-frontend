"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Easing } from "motion/react";
import FilePicker from "./custom/FilePicker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  file: File | null;
  description: string;
};

export default function HeroSection() {
  const [submitActive, setSubmitActive] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  const heroTextContainerRef = useRef<HTMLDivElement>(null);

  const { control, watch, handleSubmit } = useForm<FormData>();

  const submitForm = (data: FormData) => {
    console.log(data, "dddddd");

    setSubmitActive(true);
    const cleanDescription = data.description
      ?.replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const payload = {
      ...data,
      description: cleanDescription,
    };

    console.log(payload, "pay");
  };

  console.log(watch("file"));

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const updateOffset = () => {
      if (heroTextContainerRef.current) {
        const rect = heroTextContainerRef.current.getBoundingClientRect();
        const offset = rect.height / 2 - 30;
        setTopOffset(offset);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

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
      y: -topOffset,
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
      y: -topOffset + 20,
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

  // console.log(submitActive, "submit");

  return (
    <div className="h-[90vh] border-2 mt-10 relative">
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
          className={`absolute top-[3%] sm:top-[10%] md:top-[13%] xl:top-[15%] left-[50%] transform: translate-x-[-50%] justify-center items-center flex flex-col text-center w-[100%] lg:w-[65%]`}
          ref={heroTextContainerRef}
        >
          <motion.h1
            variants={textVariants}
            initial="initial"
            animate={startAnimation ? "animate" : "initial"}
            className="text-5xl xl:text-7xl flex justify-center items-center leading-[4rem]"
          >
            Simplified Job Searching
          </motion.h1>

          <motion.p
            variants={textVariants}
            initial="initial"
            animate={startAnimation ? "animate" : "initial"}
            className="text-center mt-2 md:mt-4 text-sm md:text-md px-4 w-[100%] md:w-[90%] lg:w-[85%]"
          >
            Get personalized job listings from various portals based on your
            resume and the job description you provide — all in one place. Plus,
            see how well your resume matches each role with detailed match
            scores.
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
            className="flex justify-center mt-1 md:mt-4"
          >
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FilePicker {...field} setStartAnimation={setStartAnimation} />
              )}
            />
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
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter job description"
                  className="min-h-24 max-h-32"
                />
              )}
            />
          </motion.div>

          <motion.div
            variants={{
              ...textBoxVariants,
              initial: { ...textBoxVariants.initial, scale: 1 },
              animate: {
                ...textBoxVariants.animate,
                y: -topOffset + 40,
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
              onClick={handleSubmit(submitForm)}
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
