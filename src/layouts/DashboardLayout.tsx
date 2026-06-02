import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-dashboard-background text-dashboard-text">
      <div className="pointer-events-none absolute inset-0 bg-weather-radial opacity-90" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-500/12 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-5 lg:px-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
