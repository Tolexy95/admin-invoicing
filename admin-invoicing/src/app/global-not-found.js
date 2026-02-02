"use client";

import './globals.css';
import { DM_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  const router = useRouter();

  return (
    <html lang="en" className={dmSans.className}>
      <body className="bg-secondary-grey-300 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-[20px] shadow-lg p-10 max-w-md flex flex-col items-center justify-center text-center">
          <h1 className="text-[64px] font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-grey-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-secondary-grey-600 mb-8">
            Oops! The page you are looking for does not exist or has been moved.
          </p>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#3526b5] transition"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </body>
    </html>
  );
}
