import React from "react";

interface CoursesCardProps {
  title: string;
  price: number;
  description: string;
  onSubscribe: () => void;
  loading: boolean;
}

const CoursesCard: React.FC<CoursesCardProps> = ({ title, price, description, onSubscribe, loading }) => {
  return (
    <div className="relative flex flex-col justify-between p-4 sm:p-6 bg-white dark:bg-[#2C2758] rounded-xl transition-all border border-gray-300 dark:border-gray-600">
        <span className="absolute top-0 right-0 bg-indigo-600 text-white rounded-bl-lg rounded-tr-lg py-1 sm:py-2 px-3 sm:px-4 text-sm sm:text-lg font-bold shadow-md">
        ${price.toFixed(2)} <small className="text-xs">/ month</small>
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-4 sm:mt-5 text-center">
        {title}
        </h3>
        <p className="text-center mt-3 sm:mt-4 px-4 sm:px-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
        {description}
        </p>
        <div className="w-full flex justify-center mt-4 sm:mt-6">
        <button
            className="w-full sm:w-3/4 py-2 sm:py-3 text-center text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg font-semibold text-base sm:text-lg hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-400 dark:to-blue-400 dark:hover:from-indigo-500 dark:hover:to-blue-500 transition-all focus:outline-none shadow-md"
            onClick={onSubscribe}
            disabled={loading}
        >
            {loading ? "Processing..." : "Apply Now"}
        </button>
        </div>
    </div>
  );
};

export default CoursesCard;