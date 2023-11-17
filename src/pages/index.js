import { Inter } from 'next/font/google'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    window.location.href = `/template`;
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    </main>
  )
}
