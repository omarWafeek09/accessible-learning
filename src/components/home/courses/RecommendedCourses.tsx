// src\components\home\courses\RecommendedCourses.tsx
import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CourseCard from './CourseCard';
import styles from './Courses.module.css';

interface Course {
  thumbnail: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  lessons?: number;
  students?: number;
  rating?: number;
  instructor?: string;
  price?: string;
  isFree?: boolean;
}

const courses: Course[] = [
  {
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=200&fit=crop',
    title: 'تقنيات التكامل الحسي',
    category: 'علاج',
    duration: '60 دقيقة',
    level: 'متوسط',
    lessons: 20,
    students: 890,
    rating: 4.7,
    instructor: 'أ. محمد حسن',
    price: '49 ريال',
    isFree: false
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=200&fit=crop',
    title: 'العلاج بالفن للتعبير العاطفي',
    category: 'إبداع',
    duration: '35 دقيقة',
    level: 'مبتدئ',
    lessons: 10,
    students: 1560,
    rating: 4.7,
    instructor: 'أ. Nora',
    price: 'مجاني',
    isFree: true
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=400&h=200&fit=crop',
    title: 'الموسيقى العلاجية للأطفال',
    category: 'موسيقى',
    duration: '30 دقيقة',
    level: 'مبتدئ',
    lessons: 8,
    students: 920,
    rating: 4.8,
    instructor: 'م. يوسف',
    price: '29 ريال',
    isFree: false
  },
  {
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    title: 'قراءة القصص للتعلم',
    category: 'لغة',
    duration: '25 دقيقة',
    level: 'مبتدئ',
    lessons: 16,
    students: 3200,
    rating: 4.9,
    instructor: 'أ. منى',
    price: 'مجاني',
    isFree: true
  }
];

const CARD_GAP = 16;

const RecommendedCourses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardWidth, setCardWidth] = useState(420);
  const [currentDot, setCurrentDot] = useState(0);

  const SCROLL_AMOUNT = cardWidth + CARD_GAP;

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth >= 1400) {
        setCardWidth(380);
      } else if (window.innerWidth >= 1200) {
        setCardWidth(440);
      } else if (window.innerWidth >= 992) {
        setCardWidth(400);
      } else if (window.innerWidth >= 768) {
        setCardWidth(360);
      } else {
        setCardWidth(300);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      
      const totalScrollWidth = scrollWidth - clientWidth;
      if (totalScrollWidth > 0) {
        const progress = scrollLeft / totalScrollWidth;
        const totalDots = Math.ceil(courses.length - (clientWidth / (cardWidth + CARD_GAP))) + 1;
        const newDot = Math.min(Math.floor(progress * totalDots), totalDots - 1);
        setCurrentDot(Math.max(0, newDot));
      }
    }
  }, [cardWidth]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      checkScroll();
      scrollEl.addEventListener('scroll', checkScroll);
      return () => scrollEl.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  const scrollBy = useCallback((direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'prev' ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
        behavior: 'smooth'
      });
    }
  }, [SCROLL_AMOUNT]);

  const startContinuousScroll = useCallback((direction: 'prev' | 'next') => {
    if (scrollRef.current && !scrollIntervalRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({
            left: direction === 'prev' ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
            behavior: 'auto'
          });
        }
      }, 50);
    }
  }, [SCROLL_AMOUNT]);

  const stopScrolling = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  const scrollToDot = useCallback((index: number) => {
    if (scrollRef.current) {
      const scrollAmount = (cardWidth + CARD_GAP) * index;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [cardWidth]);

  const arrowButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    backgroundColor: 'var(--surface)',
    border: '2px solid var(--border)',
    borderRadius: '50%',
    color: 'var(--text)',
    zIndex: 10,
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const totalDots = Math.max(1, Math.ceil(courses.length - 2));

  return (
    <section id="courses" className="py-5" style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="courses-title">
      <div className="container-fluid px-4 px-lg-5" style={{ maxWidth: '1600px' }}>
        <motion.div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>الدورات</span>
            <h2 id="courses-title" className="display-5 fw-bold mb-0" style={{ color: 'var(--text)' }}>
              ابدأ رحلتك التعليمية
            </h2>
          </div>
          <button className="btn d-flex align-items-center gap-2 fw-bold" style={{ color: 'var(--primary)' }} aria-label="عرض جميع الدورات">
            عرض الكل <FaArrowRight style={{ transform: 'rotate(180deg)' }} />
          </button>
        </motion.div>

        <div className="position-relative">
          <button
            onClick={() => scrollBy('prev')}
            onMouseDown={() => startContinuousScroll('prev')}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startContinuousScroll('prev')}
            onTouchEnd={stopScrolling}
            style={{ ...arrowButtonStyles, right: '0px' }}
            disabled={!canScrollLeft}
            aria-label="السابق"
          >
            <FaChevronRight />
          </button>
          
          <button
            onClick={() => scrollBy('next')}
            onMouseDown={() => startContinuousScroll('next')}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            onTouchStart={() => startContinuousScroll('next')}
            onTouchEnd={stopScrolling}
            style={{ ...arrowButtonStyles, left: '0px' }}
            disabled={!canScrollRight}
            aria-label="التالي"
          >
            <FaChevronLeft />
          </button>

          <style>{`
            .courses-carousel::-webkit-scrollbar { display: none; }
            .courses-carousel { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div
            ref={scrollRef}
            className="courses-carousel d-flex gap-4 overflow-auto py-3"
            style={{ 
              scrollSnapType: 'x mandatory',
              padding: '0 80px'
            }}
            role="list"
            aria-label="الدورات الموصى بها"
          >
            {courses.map((course: Course, index: number) => (
              <motion.div
                key={index}
                ref={index === 0 ? cardRef : null}
                style={{ 
                  flex: `0 0 ${cardWidth}px`, 
                  scrollSnapAlign: 'start',
                  maxWidth: '100%'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToDot(index)}
                style={{
                  width: currentDot === index ? '24px' : '10px',
                  height: '10px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: currentDot === index ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                aria-label={`انتقل للشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedCourses;