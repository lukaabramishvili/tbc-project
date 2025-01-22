import Image from "next/image";
import Businesswoman from "../../../../public/home/professional-asian-businesswoman-gray-blazer.jpg";
import IntroductionImage from "../../../../public/home/horizontal-shot-happy-mixed-race-females.jpg";
import Inst from "../../../../public/instagram.png";
import Link from "next/link";

export const IntroductionJobFinder = () => {
    return (
        <div className="main flex flex-col xl:flex-row items-center justify-around mx-4 xl:mx-28 text-center xl:text-left gap-6 bg-[#0dcaf0] rounded-3xl mt-16 p-6 xl:p-0">
            <div className="introduction-first relative h-[20rem] w-full xl:w-[28rem] rounded-3xl overflow-hidden">
                <Image 
                    src={Businesswoman.src} 
                    alt="professional-asian-businesswoman" 
                    fill 
                    className="object-cover"
                />
                <div className="absolute bottom-4 left-4 text-black bg-white bg-opacity-50 p-2 rounded">
                    <h3 className="text-2xl border-b-2 border-black">Julia Ward</h3>
                    <p>Investor</p>
                </div>
            </div>

            <div className="introduction-second text-white p-6 xl:p-10">
                <h2 className="text-3xl xl:text-4xl font-bold pb-4">Introduction Job Finder</h2>
                <p className="max-w-xl mx-auto xl:mx-0 pb-6">
                    Job Finder is a free website for job portals. 
                    This layout is based on Gotto website. 
                    Thank you for visiting Job Finder website. 
                </p>
                <div className="introduction-buttons flex flex-col xl:flex-row gap-4 xl:gap-10">
                    <Link href={'/about'} className="p-4 border-2 rounded-full hover:bg-white hover:text-blue-700 duration-500">Get to know us</Link>
                    <Link href={'/about'} className="p-4 border-2 rounded-full hover:bg-white hover:text-blue-700 duration-500">Explore Jobs</Link>
                </div>
            </div>

            <div className="introduction-third relative h-[20rem] w-full xl:w-[28rem] rounded-3xl overflow-hidden">
                <Image 
                    src={IntroductionImage.src} 
                    alt="professional-asian-businesswoman" 
                    fill 
                    className="object-cover"
                />
                <div className="absolute bottom-4 left-4 text-black bg-white bg-opacity-50 p-2 rounded">
                    <Link href={'#'} className="flex items-center gap-2">
                        <Image src={Inst.src} alt="professional-asian-businesswoman" width={20} height={20} />
                        <span>@JobFinder</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
