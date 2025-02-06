import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Clock from '../../../../public/clock.png';
import Location from '../../../../public/location.png';
import Money from '../../../../public/money.png';
import { useLanguage } from '@/app/context/LanguageContext';

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

const FeaturedJobscard = () => {
  const supabase = createClient();
  const { language } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/fetchJobs');
        if (response.ok) {
          const { data } = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setResponseMessage(language === 'eng' ? 'Application sent!' : 'განაცხადი გაიგზავნა!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSelectedJob(null), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto my-16 bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow-xl p-6 md:p-8">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === 'eng' ? 'Featured Jobs' : 'გამორჩეული ვაკანსიები'}
        </h1>
        <p className="text-lg md:text-xl">
          {language === 'eng' 
            ? 'Discover over 10,000 opportunities. Find your perfect match below.'
            : '10,000-ზე მეტი შესაძლებლობა. იპოვეთ თქვენი იდეალური ვაკანსია.'}
        </p>
      </header>

      <div className="space-y-8">
        {jobs.map((job) => (
          <article 
            key={job.id}
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <img 
                src={job.img_url} 
                alt={job.title}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="min-w-0">
                <h3 className="text-xl font-semibold truncate">{job.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Image src={Clock} alt="Clock" width={20} height={20} />
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={Location} alt="Location" width={20} height={20} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={Money} alt="Salary" width={20} height={20} />
                    <span>${job.salary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 shrink-0">
              <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-full">
                {job.position}
              </span>
              <button
                onClick={() => setSelectedJob(job.id)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
              >
                {language === 'eng' ? 'Apply Now' : 'გამოხმაურება'}
              </button>
            </div>

            {selectedJob === job.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">
                        {language === 'eng' ? 'Application Form' : 'განაცხადის ფორმა'}
                      </h2>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                      >
                        ✖
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={language === 'eng' ? 'Full Name' : 'სრული სახელი'}
                          className="p-3 border rounded-lg dark:bg-gray-700"
                        />
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          className="p-3 border rounded-lg dark:bg-gray-700"
                        />
                        <input
                          required
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={language === 'eng' ? 'Position' : 'პოზიცია'}
                          className="p-3 border rounded-lg dark:bg-gray-700"
                        />
                      </div>
                      
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={language === 'eng' ? 'Your qualifications...' : 'თქვენი კვალიფიკაცია...'}
                        className="w-full p-3 border rounded-lg h-32 resize-y dark:bg-gray-700"
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {loading 
                          ? (language === 'eng' ? 'Sending...' : 'იგზავნება...')
                          : (language === 'eng' ? 'Submit Application' : 'გაგზავნა')}
                      </button>
                    </form>

                    {responseMessage && (
                      <p className="mt-4 text-green-600 dark:text-green-400">
                        {responseMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobscard;