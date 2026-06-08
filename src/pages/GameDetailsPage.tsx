// src\pages\GameDetailsPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaClock, FaUsers, FaStar, FaPlay, FaBars, 
  FaLock, FaVolumeUp, FaGamepad, FaTrophy,
  FaBrain, FaEye
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import Chatbot from '../components/ui/Chatbot';

interface Game {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  duration: string;
  level: string;
  players: number;
  rating: number;
  developer: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  skills: string[];
  requirements: string[];
  features: { title: string; description: string }[];
  tags: string[];
}

const gamesData: Record<string, Game> = {
  '1': {
    id: '1',
    icon: '🧩',
    title: 'لعبة تكوين الكلمات',
    category: 'لغة',
    description: 'لعبة تعليمية ممتعة لتكوين الكلمات وتحسين المهارات اللغوية.',
    longDescription: 'لعبة تعليمية تفاعلية مصممة خصيصاً لمساعدة الأطفال على تحسين مهاراتهم اللغوية. تتضمن اللعبة مجموعة متنوعة من المستويات التي تتدرج في الصعوبة، حيث يبدأ اللاعب بتكوين كلمات بسيطة ويتقدم تدريجياً إلى كلمات أكثر تعقيداً. تتميز اللعبة بواجهة سهلة الاستخدام ومبسطة تناسب جميع الأعمار.',
    duration: '15-30 دقيقة',
    level: 'مبتدئ',
    players: 1250,
    rating: 4.8,
    developer: {
      name: 'فريق التطوير التعليمي',
      title: 'مطور ألعاب تعليمية',
      bio: 'فريق متخصص في إنشاء ألعاب تعليمية تفاعلية لتنمية مهارات الأطفال.',
      avatar: ''
    },
    skills: ['تكوين الكلمات', 'الإملاء', 'التركيز', 'التفكير المنطقي'],
    requirements: ['لا تشترط خبرة سابقة', 'ميكروفون للتحدث', 'متصفح حديث'],
    features: [
      { title: 'مستويات متعددة', description: 'أكثر من 50 مستوى متنوع' },
      { title: 'تتبع التقدم', description: 'نظام متتبع للتقدم والإنجازات' },
      { title: 'مساعدة صوتية', description: 'دعم الأوامر الصوتية' }
    ],
    tags: ['لغة', 'أطفال', 'تفاعلي', 'مبتدئ']
  },
  '2': {
    id: '2',
    icon: '🧠',
    title: 'الذاكرة الاحترافية',
    category: 'إدراك',
    description: 'تدريب الذاكرة قصيرة المدى مع مستويات صعوبة متصاعدة.',
    longDescription: 'لعبة تدريبية للذاكرة مصممة لتحسين الذاكرة قصيرة المدى. تتضمن مستويات متعددة من الصعوبة تبدأ من السهل وتصل إلى المتقدم.',
    duration: '10-20 دقيقة',
    level: 'مبتدئ',
    players: 890,
    rating: 4.6,
    developer: {
      name: 'فريق التطوير التعليمي',
      title: 'مطور ألعاب تعليمية',
      bio: 'فريق متخصص في إنشاء ألعاب تعليمية.',
      avatar: ''
    },
    skills: ['الذاكرة', 'التركيز', 'الانتباه'],
    requirements: ['لا تشترط خبرة سابقة', 'متصفح حديث'],
    features: [
      { title: 'مستويات متعددة', description: 'أكثر من 30 مستوى' },
      { title: 'تتبع التقدم', description: 'نظام متتبع للتقدم' }
    ],
    tags: ['إدراك', 'ذاكرة', 'مبتدئ']
  },
  '3': {
    id: '3',
    icon: 'ABC',
    title: 'مغامرة بناء الكلمات',
    category: 'لغة',
    description: 'بناء المفردات من خلال ألعاب تكوين كلمات تفاعلية مع دعم صوتي.',
    longDescription: 'لعبة تعليمية لبناء المفردات وتطوير المهارات اللغوية. تتميز بت_levels متدرجة ودعم الأوامر الصوتية.',
    duration: '20-35 دقيقة',
    level: 'متوسط',
    players: 654,
    rating: 4.7,
    developer: {
      name: 'فريق التطوير التعليمي',
      title: 'مطور ألعاب تعليمية',
      bio: 'فريق متخصص في إنشاء ألعاب تعليمية.',
      avatar: ''
    },
    skills: ['المفردات', 'الإملاء', 'القراءة'],
    requirements: ['خبرة بسيطة', 'ميكروفون'],
    features: [
      { title: 'مستويات متعددة', description: 'أكثر من 40 مستوى' },
      { title: 'دعم صوتي', description: 'الأوامر الصوتية' }
    ],
    tags: ['لغة', 'متوسط', 'صوتي']
  }
};

const categoryColors: Record<string, string> = {
  'لغة': 'linear-gradient(135deg, #58cc02 0%, #3ace02 100%)',
  'إدراك': 'linear-gradient(135deg, #ce82ff 0%, #a855f7 100%)',
  'حركة': 'linear-gradient(135deg, #ff9600 0%, #fbbf24 100%)',
  'اجتماعي': 'linear-gradient(135deg, #0a84ff 0%, #3b82f6 100%)'
};

interface GameDetailsPageProps {
  gameId?: string;
}

const GameDetailsPage = ({ gameId = '1' }: GameDetailsPageProps) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const game = gamesData[gameId] || gamesData['1'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const speakDescription = () => {
    if (!window.responsiveVoice) return;
    
    if (isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    window.responsiveVoice.speak(
      `${game.title}. ${game.longDescription}`,
      'Arabic Female',
      {
        rate: 0.9,
        pitch: 1,
        onend: () => setIsSpeaking(false),
        onerror: () => setIsSpeaking(false)
      }
    );
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'مبتدئ': return 'var(--primary)';
      case 'متوسط': return 'var(--warning)';
      case 'متقدم': return 'var(--danger)';
      default: return 'var(--primary)';
    }
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'skills', label: 'المهارات' },
    { id: 'developer', label: 'المطور' },
    { id: 'reviews', label: 'التقييمات' }
  ];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>
        <section className="py-4" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="position-relative mb-4" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <div 
                      className="w-100 d-flex align-items-center justify-content-center"
                      style={{ 
                        height: '400px', 
                        background: categoryColors[game.category] || categoryColors['لغة']
                      }}
                    >
                      <span style={{ fontSize: '8rem' }}>{game.icon}</span>
                    </div>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                         style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/auth'}
                        className="btn rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: 'var(--primary)',
                          border: 'none',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                        }}
                        aria-label="تشغيل اللعبة"
                      >
                        <FaPlay style={{ color: 'white', fontSize: '24px', marginInlineStart: '4px' }} />
                      </motion.button>
                    </div>
                    <div className="position-absolute" style={{ bottom: '16px', right: '16px' }}>
                      <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.7)', fontSize: '0.9rem' }}>
                        <FaClock className="ms-2" />
                        {game.duration}
                      </span>
                    </div>
                  </div>

                  <nav className="d-flex gap-2 overflow-auto py-2" aria-label="أقسام اللعبة">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="btn px-4 py-2 rounded-pill fw-semibold"
                        style={{
                          backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface-elevated)',
                          color: activeTab === tab.id ? 'white' : 'var(--text-light)',
                          border: 'none',
                          whiteSpace: 'nowrap'
                        }}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </motion.div>
              </div>

              <div className="col-lg-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="card border-0 shadow-lg"
                  style={{ 
                    borderRadius: '20px', 
                    backgroundColor: 'var(--surface)',
                    position: 'sticky',
                    top: '100px'
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge" style={{ backgroundColor: 'rgba(206, 130, 255, 0.15)', color: 'var(--secondary)' }}>
                        {game.category}
                      </span>
                      <span className="badge" style={{ backgroundColor: getLevelColor(game.level), color: 'white' }}>
                        {game.level}
                      </span>
                    </div>

                    <h1 className="h3 fw-bold mb-3" style={{ color: 'var(--text)' }}>{game.title}</h1>

                    <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
                      <div className="d-flex align-items-center gap-1" style={{ color: 'var(--warning)' }}>
                        <FaStar />
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{game.rating}</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>({game.players}+ تقييم)</span>
                      </div>
                      <div className="d-flex align-items-center gap-1" style={{ color: 'var(--text-light)' }}>
                        <FaUsers />
                        {game.players}+ لاعب
                      </div>
                      <div className="d-flex align-items-center gap-1" style={{ color: 'var(--text-light)' }}>
                        <FaGamepad />
                        فردي
                      </div>
                    </div>

                    <p className="mb-4" style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
                      {game.description}
                    </p>

                    <div className="d-flex align-items-center gap-2 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={speakDescription}
                        className="btn d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--surface-elevated)',
                          border: '2px solid var(--border)',
                          color: 'var(--text)'
                        }}
                        aria-label={isSpeaking ? 'إيقاف الصوت' : 'قراءة الوصف'}
                      >
                        <FaVolumeUp />
                      </motion.button>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>استمع إلى الوصف</span>
                    </div>

                    <div className="mb-4 p-3" style={{ 
                      backgroundColor: 'var(--surface-elevated)',
                      borderRadius: '12px'
                    }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>السعر</span>
                        <span className="h3 fw-bold" style={{ color: 'var(--primary)' }}>
                          مجاني
                        </span>
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      fullWidth 
                      size="large"
                      onClick={() => window.location.href = '/auth'}
                      disabled
                    >
                      <FaLock className="ms-2" />
                      سجل دخول للعب
                    </Button>

                    <p className="text-center mt-3 mb-0" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      أو <a href="/auth" style={{ color: 'var(--primary)' }}>تسجيل جديد</a> مجاناً
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="card-body p-4">
                      <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>مميزات اللعبة</h2>
                      <div className="row g-3 mb-4">
                        {game.features.map((feature, index) => (
                          <div key={index} className="col-md-6">
                            <div className="d-flex align-items-start gap-3 p-3" style={{ 
                              backgroundColor: 'var(--surface-elevated)', 
                              borderRadius: '12px',
                              height: '100%'
                            }}>
                              <FaTrophy className="flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                              <div>
                                <h3 className="h6 fw-bold mb-1" style={{ color: 'var(--text)' }}>{feature.title}</h3>
                                <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{feature.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>المتطلبات</h2>
                      <ul className="list-unstyled mb-4">
                        {game.requirements.map((req, index) => (
                          <li key={index} className="d-flex align-items-start gap-3 mb-3" style={{ color: 'var(--text-light)' }}>
                            <FaBars style={{ color: 'var(--primary)', marginTop: '4px' }} />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>

                      <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>الوصف</h2>
                      <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>{game.longDescription}</p>

                      <div className="d-flex gap-2 flex-wrap">
                        {game.tags.map((tag, index) => (
                          <span key={index} className="badge px-3 py-2" style={{ 
                            backgroundColor: 'var(--surface-elevated)', 
                            color: 'var(--text-light)',
                            fontSize: '0.85rem'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="card-body p-4">
                      <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>المهارات المكتسبة</h2>
                      <div className="d-flex flex-column gap-3">
                        {game.skills.map((skill, index) => (
                          <div key={index} className="d-flex align-items-center gap-3 p-3" style={{ 
                            backgroundColor: 'var(--surface-elevated)', 
                            borderRadius: '12px'
                          }}>
                            <FaBrain style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
                            <span className="fw-bold" style={{ color: 'var(--text)' }}>{skill}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3" style={{ 
                        backgroundColor: 'rgba(88, 204, 2, 0.1)', 
                        borderRadius: '12px',
                        border: '1px solid var(--primary)'
                      }}>
                        <p className="mb-0" style={{ color: 'var(--text)' }}>
                          <FaEye className="ms-2" />
                          هذه اللعبة تساعد على تطوير مهارات الأطفال بشكل تفاعلي وممتع.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'developer' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="card-body p-4">
                      <h2 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>المطور</h2>
                      <div className="d-flex gap-4 align-items-start">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'var(--secondary)',
                            color: 'white',
                            fontSize: '2rem',
                            flexShrink: 0
                          }}
                        >
                          {game.developer.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--text)' }}>{game.developer.name}</h3>
                          <p className="mb-2" style={{ color: 'var(--secondary)' }}>{game.developer.title}</p>
                          <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>{game.developer.bio}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="display-4 fw-bold" style={{ color: 'var(--text)' }}>{game.rating}</div>
                          <div className="d-flex gap-1 justify-content-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} style={{ color: i < Math.floor(game.rating) ? 'var(--warning)' : 'var(--border)', fontSize: '0.9rem' }} />
                            ))}
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{game.players} تقييم</span>
                        </div>
                        <div className="flex-grow-1">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="d-flex align-items-center gap-2 mb-2">
                              <div className="flex-grow-1" style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--surface-elevated)' }}>
                                <div 
                                  style={{ 
                                    height: '100%', 
                                    width: stars === 5 ? '70%' : stars === 4 ? '20%' : '10%', 
                                    borderRadius: '4px',
                                    backgroundColor: 'var(--warning)' 
                                  }} 
                                />
                              </div>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', width: '30px' }}>{stars} ★</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-top pt-4">
                        <p className="text-center" style={{ color: 'var(--text-light)' }}>
                          سجّل دخول para عرض التقييمات
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}>
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>معلومات اللعبة</h3>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>المدة</span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{game.duration}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>المستوى</span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{game.level}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>عدد اللاعبين</span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{game.players}+</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>التقييم</span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{game.rating}/5</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: 'var(--text-light)' }}>النوع</span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>تعليمي</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)' }}>
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>ألعاب مشابهة</h3>
                    <div className="d-flex flex-column gap-3">
                      {Object.values(gamesData).filter(g => g.id !== gameId).slice(0, 3).map((g) => (
                        <div 
                          key={g.id} 
                          className="d-flex gap-3 p-2" 
                          style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', cursor: 'pointer' }}
                          onClick={() => window.location.href = `/game/${g.id}`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              window.location.href = `/game/${g.id}`;
                            }
                          }}
                        >
                          <div 
                            className="rounded d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '60px', 
                              height: '60px', 
                              backgroundColor: 'var(--border)',
                              flexShrink: 0,
                              fontSize: '1.5rem'
                            }}
                          >
                            {g.icon}
                          </div>
                          <div>
                            <p className="mb-1 fw-semibold" style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{g.title}</p>
                            <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{g.level} • {g.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
};

export default GameDetailsPage;