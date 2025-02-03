import Image from "next/image";
import { logout } from "../logout/actions";
import Link from "next/link";

export default function yourCourses() {
    const user = { email: "user@example.com" }; 

    return (
        <section className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8">
        <h1 className="text-3xl bold">Web Programming Course Syllabus</h1>
        <div className="text-black py-8 px-4 text-start">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                <h2 className="text-xl font-bold">Front end development</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Static website creation</li>
                    <li>Web design adaptation from CSS to layout</li>
                    <li>Website optimization for better performance</li>
                    <li>Basic JavaScript knowledge</li>
                </ul>
                </div>

                <div>
                <h2 className="text-xl font-bold">React front end development</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Dynamic web application development with React technology</li>
                    <li>JavaScript programming for modern functionality</li>
                    <li>Fullstack app development with React/Firebase technology</li>
                </ul>
                </div>

                <div>
                <h2 className="text-xl font-bold">Node JS backend development</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Node.js technology usage for server development</li>
                    <li>JavaScript backend skills</li>
                    <li>Rest API implementation and project structure creation</li>
                    <li>Database setup with MongoDB</li>
                    <li>Advanced testing with unit/integration tests</li>
                </ul>
                </div>
            </div>
        </div>
        </section>
    );
}