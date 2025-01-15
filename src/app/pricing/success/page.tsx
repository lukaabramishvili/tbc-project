import Link from "next/link";

export default function Success(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#2c2758] text-[#7f73eb]">
      <div className="max-w-md w-full p-6 border border-[#2c2758] rounded-lg shadow-lg bg-[#2c2758] dark:bg-white">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-white dark:text-[#7f73eb]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-white dark:text-[#7f73eb]">Success!</h1>
          <p className="mt-2 text-sm text-white dark:text-gray-500">
            Your operation was completed successfully.
          </p>
        </div>
        <Link href="/home" className="block w-full mt-6 px-4 py-2 text-center text-white bg-[#7f73eb] rounded-md shadow-md hover:bg-[#7f73eb] dark:bg-white dark:text-[#7f73eb] dark:border-[#7f73eb] dark:hover:bg-[#7f73eb]">
            Go back
        </Link>
      </div>
    </div>
  );
}