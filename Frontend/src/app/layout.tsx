import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Insurance Advisor | Get Personalized Insurance Recommendations',
  description: 'Get personalized insurance recommendations based on your age, income, dependents, and risk tolerance. Free analysis with expert-backed suggestions.',
  keywords: ['insurance', 'life insurance', 'recommendation', 'advisor', 'financial planning'],
  authors: [{ name: 'Insurance Advisor Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Insurance Advisor | Get Personalized Insurance Recommendations',
    description: 'Get personalized insurance recommendations based on your unique profile',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Advisor | Get Personalized Insurance Recommendations',
    description: 'Get personalized insurance recommendations based on your unique profile',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
