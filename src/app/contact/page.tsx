'use client'

import { useState } from "react";
import { Mail, Phone, Globe, Building, Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMessage("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-[#2C2758] p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5575042690184!2d44.79247037601565!3d41.70848727601669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440daa2f2fa18d%3A0x4d33e12d151c36ea!2z4YOX4YOY4YOR4YOY4YOh4YOYIOGDmeGDneGDnOGDquGDlOGDnuGDouGDmCAtIFRCQyBDb25jZXB0!5e0!3m2!1sen!2sge!4v1738399217851!5m2!1sen!2sge"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border shadow-md"
            ></iframe>
          </div>

          <div className="space-y-4">
            {[
              { icon: Building, text: "7 Kote Marjanishvili St, Tbilisi 0102" },
              { icon: Globe, text: "https://tbc-project-five.vercel.app/" },
              { icon: Phone, text: "(+995) 555-11-11-11" },
              { icon: Mail, text: "lukaabramishvili3@gmail.com" },
              { icon: Linkedin, text: "https://www.linkedin.com/in/luka-abramishvili-9332a7289/" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-blue-50 dark:bg-[#374151] p-4 rounded-xl">
                <item.icon className="text-blue-500 dark:text-white" />
                <p className="dark:text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold dark:text-white">
            {language === "eng" ? "Do you have something in mind? Let's talk." : "რაიმე გაქვს მხედველობაში? მოდით ვისაუბროთ"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === "eng" ? "Full Name" : "სრული სახელი და გვარი"}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 dark:bg-[#374151] dark:text-white"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={language === "eng" ? "Email Address" : "ელექტრონული ფოსტა"}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 dark:bg-[#374151] dark:text-white"
              />
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={language === "eng" ? "Subject" : "საგანი"}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 dark:bg-[#374151] dark:text-white"
              />
            </div>
            <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={language === "eng" ? "What can we help you with?" : "რით შეგვიძლია დაგეხმაროთ?"}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 dark:bg-[#374151] dark:text-white"
                rows={5}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 dark:bg-[#2C2758] text-white py-3 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 transition transform hover:scale-105 shadow-lg"
              disabled={loading}
            >
              {loading ? 
              `${language === "eng" ? "Sending..." : "იგზავნება..."}` : 
              `${language === "eng" ? "Send Message" : "მესიჯის გაგზავნა"}`}
            </button>
          </form>
          {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
}
