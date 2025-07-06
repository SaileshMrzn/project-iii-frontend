import React, { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, Easing, motion } from "motion/react";
import { ControllerRenderProps } from "react-hook-form";

interface FilePickerProps extends ControllerRenderProps {
  setStartAnimation: (start: boolean) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  onChange,
  ref: fieldRef,
  setStartAnimation,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setStartAnimation(true);
      onChange(file);
    }
  };

  useEffect(() => {
    if (!fileName) {
      setStartAnimation(false);
    }
  }, [fileName, setStartAnimation]);

  const selectedFileFade = {
    initial: { opacity: 0, y: -40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { ease: "backInOut" as Easing, duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { ease: "backInOut" as Easing, duration: 0.4 },
    },
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-fit px-10 py-2 rounded-sm flex items-center gap-4 bg-white/80 shadow-lg border border-gray-300 hover:bg-blue-50 transition-colors cursor-pointer relative z-2"
        onClick={handleDivClick}
      >
        <input
          type="file"
          ref={(e) => {
            if (typeof fieldRef === "function") {
              fieldRef(e);
            }
            inputRef.current = e;
          }}
          className="hidden"
          onChange={handleFileChange}
        />
        <IoCloudUploadOutline size={20} className="text-blue-500" />
        <span className="font-medium text-gray-800">Upload Resume</span>
      </div>

      <div className="w-full h-6">
        <AnimatePresence>
          {fileName && (
            <motion.div
              className="flex items-center justify-between w-full px-1"
              variants={selectedFileFade}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.span className="text-sm underline w-[90%] overflow-hidden whitespace-nowrap text-ellipsis text-left">
                {fileName}
              </motion.span>

              <motion.div
                onClick={() => setFileName("")}
                initial={{ opacity: 0.7, scale: 0.9 }}
                whileHover={{
                  opacity: 1,
                  scale: 1,
                  transition: { ease: "backOut" },
                }}
              >
                <IoCloseOutline />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilePicker;
