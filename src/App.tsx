import { motion } from 'framer-motion';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <HomePage />
      </motion.div>
    </DashboardLayout>
  );
}
