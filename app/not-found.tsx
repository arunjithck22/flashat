"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white text-center overflow-hidden">
      {/* Animated 404 Text with Text Shadow */}
      <motion.h1
        className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-700 custom-text-shadow [text-shadow:_0_4px_8px_#00BCD4] text-[#00BCD4]  leading-snug font-manrope "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Subheading with subtle animation */}
      <motion.p
        className="text-lg text-gray-300 mt-2 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {`The page you're looking for doesn't exist. It might have been moved or deleted.`}
      </motion.p>

      {/* Stylish Home Button with Icon */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link href="/">
          <button className="flex items-center px-6 py-3 text-lg font-medium bg-gray-800 text-white rounded-lg shadow-md transition-all hover:bg-gray-900 hover:shadow-lg">
            <IoMdArrowRoundBack className="mr-2 text-2xl animate-pulse " />
            Back to Home
          </button>
        </Link>
      </motion.div>

      {/* Floating Animated Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-purple-500 opacity-30 rounded-full blur-3xl"
        animate={{ x: [0, 20, -20, 0], y: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 opacity-30 rounded-full blur-3xl"
        animate={{ x: [0, -15, 15, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-20 h-20 bg-pink-500 opacity-20 rounded-full blur-3xl"
        animate={{ x: [0, -20, 20, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
    </div>
  );
}
