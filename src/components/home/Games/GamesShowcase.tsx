import { motion } from 'framer-motion';
import GameCard from './GameCard';

interface Game {
  icon: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  color: string;
}

const games: Game[] = [
  {
    icon: '🧠',
    title: 'الذاكرة الاحترافية',
    category: 'ذاكرة',
    description: 'تدريب الذاكرة قصيرة المدى مع مستويات صعوبة متصاعدة وإشارات بصرية.',
    skills: ['انتباه', 'تذكر', 'بصري'],
    color: '#58cc02'
  },
  {
    icon: '🧩',
    title: 'تحدي مصنف الأشكال',
    category: 'ألغاز',
    description: 'حل ألغاز مكانية تتكيف مع مستوى المهارة في الوقت الفعلي.',
    skills: ['حل مشكلات', 'فضائي', 'منطق'],
    color: '#ce82ff'
  },
  {
    icon: '📝',
    title: 'مغامرة بناء الكلمات',
    category: 'لغة',
    description: 'بناء المفردات من خلال ألعاب تكوين كلمات تفاعلية مع دعم صوتي.',
    skills: ['مفردات', 'صوتيات', 'قراءة'],
    color: '#1cb0f6'
  },
  {
    icon: '🔢',
    title: 'مستكشف الحساب',
    category: 'رياضيات',
    description: 'تطوير مهارات الرياضيات الأساسية من خلال العد التفاعلي والتعرف على الأرقام.',
    skills: ['عد', 'الأنماط', 'تعرف على الأرقام'],
    color: '#ff9600'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotate: -5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5 } }
};

const GamesShowcase = () => (
  <section id="games" className="py-5 position-relative" style={{ backgroundColor: 'var(--background)' }} aria-labelledby="games-title">
    <div className="container">
      <motion.header
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>الألعاب</span>
        <h2 id="games-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
          تعلم وأنت تلعب
        </h2>
        <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
          ألعاب تعليمية مصممة لتطوير المهارات بطريقة ممتعة وتفاعلية.
        </p>
      </motion.header>

      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {games.map((game: Game, index: number) => (
          <motion.div key={index} className="col-12 col-md-6 col-lg-3" variants={itemVariants}>
            <GameCard {...game} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default GamesShowcase;