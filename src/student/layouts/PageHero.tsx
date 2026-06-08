// src/student/layouts/PageHero.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./PageLayout.module.css";

interface PageHeroProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  accent?: "green" | "purple" | "sun" | "blue";
  action?: ReactNode;
}

const accentMap = {
  green: styles.accentGreen,
  purple: styles.accentPurple,
  sun: styles.accentSun,
  blue: styles.accentBlue,
} as const;

const PageHero = ({ icon, title, subtitle, accent = "green", action }: PageHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${styles.pageHero} ${accentMap[accent]}`}
    >
      <div className={styles.pageHeroLeft}>
        {icon && <div className={styles.pageHeroIcon}>{icon}</div>}
        <div>
          <h1 className={styles.pageHeroTitle}>{title}</h1>
          {subtitle && <p className={styles.pageHeroSub}>{subtitle}</p>}
        </div>
      </div>
      {action && <div className={styles.pageHeroAction}>{action}</div>}
    </motion.div>
  );
};

export default PageHero;
