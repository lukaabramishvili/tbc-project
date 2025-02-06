import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Clock from '../../../../public/clock.png';
import Location from '../../../../public/location.png';
import Money from '../../../../public/money.png';
import { useLanguage } from '@/app/context/LanguageContext';

const FeaturedJobscard = () => {
  const supabase = createClient();
  const { language } = useLanguage();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });


  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/fetchJobs');
        if (response.ok) {
          const { data } = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs.');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    }
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage('Email sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResponseMessage('Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  interface Job {
    id: number;
    created_at: string;
    title: string;
    img_url: string;
    location: string;
    salary: number;
    position: string;
    working_time: string;
  }

  return (
    <div className="relative h-full w-full max-w-[calc(100vw-10rem)] my-16 overflow-hidden bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow-xl p-8">
      <h2 className="mb-4">
        <strong className="text-5xl" id="featuredJobs">
          {language === 'eng' ? 'Featured Jobs' : 'გამორჩეული ვაკანსიები'}
        </strong>
      </h2>
      <p>
        <strong>
          {language === 'eng' ? 'Over 10k opening jobs.' : '10 ათასზე მეტი სამუშაო ადგილი. '}
        </strong>
        {language === 'eng'
          ? 'You can best of them see here '
          : 'მათგან საუკეთესო შეგიძლიათ ნახოთ აქ '}
        <br />
      </p>

      {jobs.map((job) => (
        <div
          className="job-container w-full flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-12 mt-8 hover:scale-95 shadow-md duration-200 py-4 px-4"
          key={job.id}
        >
          <div className="job-logo flex-shrink-0">
            <img
              src={job.img_url}
              alt={job.title}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full"
            />
          </div>
          <div className="job-context text-center md:text-left">
            <h3 className="flex justify-center md:justify-start">
              <strong className="text-lg md:text-2xl">{job.title}</strong>
            </h3>
            <div className="job-main-text flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mt-2">
              <div className="flex items-center gap-2">
                <Image src={Clock.src} width={20} height={20} alt="Clock" />
                <p className="text-sm md:text-base">{job.created_at.slice(0, 10)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src={Location.src} width={20} height={20} alt="Location" />
                <p className="text-sm md:text-base">{job.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image src={Money.src} width={20} height={20} alt="Money" />
                <p className="text-sm md:text-base">${job.salary.toLocaleString()}</p>
              </div>
              <p className="cursor-pointer p-2 text-sm md:text-base bg-[#0DCAF0] rounded-full text-white hover:bg-[#7F73EB] duration-100">
                {job.position}
              </p>
              <p className="cursor-pointer p-2 text-sm md:text-base bg-[#0DCAF0] rounded-full text-white hover:bg-[#7F73EB] duration-100">
                {job.working_time}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="p-3 md:p-4 bg-[#7F73EB] rounded-full text-white hover:bg-[#0DCAF0] duration-100"
          >
            {language === 'eng' ? 'Apply now' : 'მიმართეთ ახლავე'}
          </button>
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-10">
              <div className="w-full max-w-md sm:max-w-lg p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                  onClick={() => setOpen(false)}
                >
                  ✖
                </button>
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {language === 'eng' ? 'Send Message' : 'მესიჯის გაგზავნა'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'eng'
                      ? 'Please type your skill details below'
                      : 'გთხოვთ, ჩაწერეთ თქვენი უნარების დეტალები ქვემოთ'}
                  </p>
                </div>

                <div className="mt-12 text-center">
                  <h2 className="text-2xl font-bold text-red-700">
                    {language === 'eng' ? 'Make sure everything is correct!' : 'დარწმუნდით, რომ ყველაფერი სწორია!'}
                  </h2>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={language === 'eng' ? 'Full Name' : 'სრული სახელი და გვარი'}
                        className="w-full p-3 border rounded-xl focus:outline-none bg-blue-50 dark:bg-[#374151] dark:text-white"
                      />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={language === 'eng' ? 'Email Address' : 'ელექტრონული ფოსტა'}
                        className="w-full p-3 border rounded-xl focus:outline-none bg-blue-50 dark:bg-[#374151] dark:text-white"
                      />
                      <input
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={language === 'eng' ? 'Enter the full name of the job.' : 'ჩაწერეთ სამუშაოს სრული სახელი'}
                        className="w-full p-3 border rounded-xl focus:outline-none bg-blue-50 dark:bg-[#374151] dark:text-white"
                      />
                    </div>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={language === 'eng' ? 'Write your skills' : 'დაწერეთ თქვენი უნარები'}
                      className="w-full p-3 border rounded-xl focus:outline-none bg-blue-50 dark:bg-[#374151] dark:text-white"
                      rows={5}
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 dark:bg-[#2C2758] text-white py-3 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 transition transform hover:scale-105 shadow-lg"
                      disabled={loading}
                    >
                      {loading ? `${language === 'eng' ? 'Sending...' : 'იგზავნება...'}` : `${language === 'eng' ? 'Send Message' : 'მესიჯის გაგზავნა'}`}
                    </button>
                  </form>
                  {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedJobscard;
