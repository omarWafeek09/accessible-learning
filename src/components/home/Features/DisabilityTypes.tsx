import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaDeaf, FaHandsHelping, FaBrain, FaHeart, FaBook, FaComments, FaLightbulb, FaCheck, FaWrench, FaPlus, FaMinus } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';
let clickSound = new Audio('../../../src/assets/audio/click.mp3')
const disabilityTypes = [
  { 
    id: 'visual', 
    icon: <FaEye />, 
    title: 'الإعاقة البصرية', 
    color: '#9c27b0', 
    shortDesc: 'ضعف البصر الجزئي أو الكلي',
    fullDescription: 'تشمل مجموعة واسعة من التحديات البصرية من ضعف البصر الخفيف إلى العمى الكامل. المتعلمون يستخدمون قارئات الشاشة والتنقل عبر الصوت للوصول للمحتوى.',
    pros: ['قوة في السمع', 'تفكير إبداعي', 'ذاكرة قوية', 'مهارات حاسوبية متقدمة'],
    cons: ['صعوبة في قراءة النصوص', 'الوصول للصور', 'التعلم البصري'],
    strategies: ['قارئات الشاشة', 'وصف صوتي', 'خط برايل', 'تباين عالي', 'تكبير'], 
    tools: ['NVDA', 'JAWS', 'KNFB'] 
  },
  { 
    id: 'hearing', 
    icon: <FaDeaf />, 
    title: 'الإعاقة السمعية', 
    color: '#e91e63', 
    shortDesc: 'فقدان السمع الجزئي أو الكلي',
    fullDescription: 'تتراوح من ضعف السمع الخفيف إلى الصمم الكامل. تعتمد على الإشارات البصرية والتسميات للتفاعل والتعلم.',
    pros: ['حساسية بصرية', 'مهارات تواصل قوية', 'انتباه للتفاصيل'],
    cons: ['صعوبة في المحاضرات', 'الوصول للوسائط', 'التواصل اللفظي'],
    strategies: ['لغة إشارة', 'تسميات', 'إشارات بصرية', 'بيئة هادئة'], 
    tools: ['Otter.ai', 'Live Transcribe', 'SignSchool'] 
  },
  { 
    id: 'motor', 
    icon: <FaHandsHelping />, 
    title: 'الإعاقة الحركية', 
    color: '#2196f3', 
    shortDesc: 'تحديات في التحكم الحركي',
    fullDescription: 'تؤثر على التحكم الدقيق بالعضلات الكبير والصغير. تشمل الشلل الدماغي وإصابات الحبل الشوكي واضطرابات التنقل.',
    pros: ['تفكير مرن', 'إبداع', 'قدرة على التكيف'],
    cons: ['بطء في الكتابة', 'صعوبة في الأجهزة', 'إرهاق جسدي'],
    strategies: ['لوحة المفاتيح', 'تحكم صوتي', 'تحكم بالعين', 'أجهزة مساعدة'], 
    tools: ['Dragon', 'EyeTech', 'Switch'] 
  },
  { 
    id: 'autism', 
    icon: <FaBrain />, 
    title: 'التوحد', 
    color: '#ff9800', 
    shortDesc: 'اضطراب طيف التوحد',
    fullDescription: 'يؤثر على التواصل الاجتماعي والسلوك والتفاعل مع البيئة. يتميز بقوة في الاهتمامات المحددة وأنماط التعلم المرنة.',
    pros: ['اهتمام عميق', 'ذاكرة استثنائية', 'تفكير منطقي', 'مهارات مرئية'],
    cons: ['صعوبة اجتماعية', 'تحسس حسي', 'تغيير الروتين'],
    strategies: ['روتينات', 'إشارات بصرية', 'مساحات هادئة', 'جدول مرن'], 
    tools: ['PECS', 'Social Stories', 'Sensory Tools'] 
  },
  { 
    id: 'down', 
    icon: <FaHeart />, 
    title: 'متلازمة داون', 
    color: '#f44336', 
    shortDesc: 'حالة وراثية مميزة',
    fullDescription: 'تتميز بخصائص جسدية خاصة وتأخر في النمو. يتمتعون بشخصية مرحة ويتميزون بالتعلم البصري والتواصل الاجتماعي.',
    pros: ['شخصية مرحة', 'تعلم بصري', 'مهارات اجتماعية', 'إبداع'],
    cons: ['تأخر لغوي', 'تأخر حركي', 'تركيز'],
    strategies: ['تبسيط', 'تعلم بصري', 'موسيقى', 'أنشطة عملية'], 
    tools: ['Picture Cards', 'Music Therapy', 'Motor Tools'] 
  },
  { 
    id: 'learning', 
    icon: <FaBook />, 
    title: 'صعوبات التعلم', 
    color: '#4caf50', 
    shortDesc: 'اضطرابات التعلم المحددة',
    fullDescription: 'تشمل عسر القراءة والديسلكسيا وعسر الكتابة وصعوبات الرياضيات. طريقة معالجة المعلومات مختلفة.',
    pros: ['تفكير مختلف', 'إبداع', 'حلول مبتكرة'],
    cons: ['قراءة', 'كتابة', 'رياضيات', 'انتباه'],
    strategies: ['نصوص صوتية', 'خطوط واضحة', 'تقسيم مهام', 'مراجعة'], 
    tools: ['NaturalReader', 'Grammarly', 'Khan'] 
  },
  { 
    id: 'speech', 
    icon: <FaComments />, 
    title: 'اضطرابات النطق', 
    color: '#00bcd4', 
    shortDesc: 'صعوبات في النطق والكلام',
    fullDescription: 'تشمل التأتأة وخلل النطق واللقوة الحركية للكلام. تؤثر على التعبير عن الأفكار.',
    pros: ['تفكير سلس', 'إلمام', 'أفكار مبتكرة'],
    cons: ['تعبير', 'ثقة بالنفس', 'تقييم'],
    strategies: ['وقت إضافي', 'AAC', 'استرخاء', 'علاج'], 
    tools: ['Proloquo2Go', 'Tobi Dynavox', 'Speech Apps'] 
  },
  { 
    id: 'intellectual', 
    icon: <FaLightbulb />, 
    title: 'الإعاقة الذهنية', 
    color: '#795548', 
    shortDesc: 'تحديات في الوظائف المعرفية',
    fullDescription: 'تؤثر على الذاكرة والتفكير والاستدلال. يحتاج إلى دعم مكثف في المهارات اليومية.',
    pros: ['صدق', 'ولاء', 'إتقان'],
    cons: ['تركيز', 'ذاكرة', 'تفكير مجرد'],
    strategies: ['خطوات صغيرة', 'وسائط بصرية', 'تكرار', 'ربط بالحياة'], 
    tools: ['Visual Schedules', 'Task Analysis', 'Choice Boards'] 
  }
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

const DisabilityTypes = () => {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? disabilityTypes.find(d => d.id === selectedId) : null;

  return (
    <section id="disability-types" className="py-5" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <motion.header className="text-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem' }}>دليل شامل</span>
          <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>أنواع الإعاقات</h2>
          <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>اختر نوع الإعاقة للتعرف على الاستراتيجيات والأدوات</p>
        </motion.header>

        {!selected ? (
          <motion.div className="row g-3 justify-content-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {disabilityTypes.map((d) => (
              <motion.div key={d.id} className="col-6 col-md-3" variants={itemVariants}>
                <motion.button onClick={() => {setSelectedId(d.id);clickSound.play(); console.log("omar")}
                           
                  
                } className="w-100 p-4 border-0" style={{ borderRadius: '20px', backgroundColor: theme === 'dark' ? 'var(--surface-elevated)' : '#f5f5f5', cursor: 'pointer' }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <div className="d-flex flex-column align-items-center gap-3">
                    <div style={{ fontSize: '2.5rem', color: d.color }}>{d.icon}</div>
                    <span className="fw-bold" style={{ color: 'var(--text)' }}>{d.title}</span>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="row g-4">
              <div className="col-12 col-md-4 order-1 order-md-1">
                <motion.div className="row g-3" variants={containerVariants} initial="hidden" whileInView="visible">
                  {disabilityTypes.map((d) => {
                    const isSelected = selectedId === d.id;
                    return (
                      <motion.div key={d.id} className="col-6 col-lg-12" variants={itemVariants}>
                        <motion.button onClick={() => {  setSelectedId(d.id) ; clickSound.play(); console.log("omar")}} className="w-100 p-3 border-0" style={{ borderRadius: '16px', backgroundColor: isSelected ? d.color : theme === 'dark' ? 'var(--surface-elevated)' : '#f5f5f5', cursor: 'pointer' }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <div className="d-flex align-items-center gap-3">
                            <div style={{ fontSize: '1.5rem', color: isSelected ? '#fff' : d.color }}>{d.icon}</div>
                            <span className="fw-bold" style={{ color: isSelected ? '#fff' : 'var(--text)' }}>{d.title}</span>
                          </div>
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
              <div className="col-12 col-md-8 order-2 order-md-2">
                <div className="card border-0" style={{ borderRadius: '24px', backgroundColor: theme === 'dark' ? 'var(--background)' : '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                  <div className="row g-0">
                    <div className="col-12" style={{ backgroundColor: selected.color }}>
                      <div className="p-4 d-flex align-items-center gap-4">
                        <motion.div style={{ fontSize: '3rem', color: '#fff' }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{selected.icon}</motion.div>
                        <div>
                          <h3 className="h3 fw-bold mb-1 text-white">{selected.title}</h3>
                          <p className="mb-0 opacity-75 text-white" style={{ fontSize: '0.95rem' }}>{selected.shortDesc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <p style={{ color: 'var(--text)', lineHeight: 1.8 }}>{selected.fullDescription}</p>
                    </div>
                    <div className="row g-4 mb-4">
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <FaPlus style={{ color: '#4caf50' }} />
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>نقاط القوة</span>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {selected.pros.map((p, i) => <span key={i} className="px-3 py-2" style={{ backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#4caf50', borderRadius: '50px', fontSize: '0.8rem' }}>{p}</span>)}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <FaMinus style={{ color: '#f44336' }} />
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>التحديات</span>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {selected.cons.map((c, i) => <span key={i} className="px-3 py-2" style={{ backgroundColor: 'rgba(244, 67, 54, 0.15)', color: '#f44336', borderRadius: '50px', fontSize: '0.8rem' }}>{c}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="d-flex align-items-center gap-2 mb-3"><FaCheck style={{ color: selected.color }} /><span className="fw-bold" style={{ color: 'var(--text)' }}>استراتيجيات التدريس</span></div>
                      <div className="d-flex flex-wrap gap-2">
                        {selected.strategies.map((s, i) => <span key={i} className="px-3 py-2" style={{ backgroundColor: `${selected.color}15`, color: selected.color, borderRadius: '50px', fontSize: '0.85rem' }}>{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3"><FaWrench style={{ color: selected.color }} /><span className="fw-bold" style={{ color: 'var(--text)' }}>أدوات مساعدة</span></div>
                      <div className="d-flex flex-wrap gap-2">
                        {selected.tools.map((t, i) => <span key={i} className="badge py-2 px-3" style={{ backgroundColor: selected.color, borderRadius: '50px', fontSize: '0.85rem' }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DisabilityTypes;