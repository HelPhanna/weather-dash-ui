import { motion } from 'framer-motion';

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className ?? ''}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        <SkeletonBlock className="h-12 w-full" />
        <SkeletonBlock className="h-[220px] w-full sm:h-[260px]" />
        <SkeletonBlock className="h-[190px] w-full sm:h-[220px]" />
        <SkeletonBlock className="h-[190px] w-full sm:h-[220px]" />
      </div>
      <SkeletonBlock className="h-[620px] w-full sm:h-[740px]" />
    </div>
  );
}

export function CardSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <SkeletonBlock className="mb-4 h-5 w-40" />
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonBlock key={index} className="h-16 w-full" />
        ))}
      </div>
    </motion.div>
  );
}
