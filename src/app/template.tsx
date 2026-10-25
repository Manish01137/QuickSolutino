"use client";

import { motion } from "framer-motion";

const WIPE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="page-curtain pointer-events-none fixed inset-0 z-[89] origin-top bg-[var(--color-primary)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: WIPE }}
      />
      <motion.div
        aria-hidden
        className="page-curtain pointer-events-none fixed inset-0 z-[90] origin-top bg-[var(--color-dark-1)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: WIPE }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
