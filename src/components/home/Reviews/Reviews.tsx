// src\components\home\Reviews\Reviews.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReviewCard from './ReviewCard';

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

const reviews: Review[] = [
  {
    name: 'سارة ميشل',
    role: 'أم لطفل مصاب باضطراب طيف التوحد',
    text: 'كانت هذه المنصة محورية لعائلتنا. ساعدت المسارات التعليمية المخصصة ابني على إحراز تقدم لا يصدق في مهارات التواصل.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'د. جيمس تشن',
    role: 'أخصائي علاج وظيفي للأطفال',
    text: 'أوصي بهذه المنصة لجميع العائلات. تمارين التكامل الحسي مصممة بشكل احترافي ومفعالة للغاية لتطوير المهارات الحركية.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'ماريا رودريغيز',
    role: 'معلمة تعليم خاص',
    text: 'الميزات سهلة الوصول والتصميم الشامل يجعل هذا مصدرا ثمينا للمتعلمين المتنوعين. الأطفال الذين ي struggle مع الطرق التقليدية يزدهرون هنا.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    name: 'ديفيد تومسون',
    role: 'أب لتوأم مصابين بعسر القراءة',
    text: 'أدوات التعلم البصري كانت نقطة تحول. بناتي متحمسات الآن للقراءة، والتي بدت مستحيلة قبل ستة أشهر فقط.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    name: 'إميلي واتسون',
    role: 'أخصائي علاج كلام ولغة',
    text: 'موارد AAC متميزة وأدوات التواصل. التقدم الذي رأيته في المرضى الذين يستخدمون هذه المنصة تجاوز كل التوقعات.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=16'
  },
  {
    name: 'مايكل أوكونكوو',
    role: 'أب وراعٍ',
    text: 'أخيراً، منصة تفهم احتياجاتنا. دعم المجتمع ربطنا بعائلات أخرى.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=14'
  }
];

const CARD_WIDTH = 400;
const CARD_GAP = 16;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

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
  }, []);

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
  }, []);

  const stopScrolling = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

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

  return (
    <section className="py-5 position-relative" style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="reviews-title">
      <div className="container">
        <motion.header
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(206, 130, 255, 0.12)', color: 'var(--secondary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>آراء المستخدمين</span>
          <h2 id="reviews-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
            قصص التأثير
          </h2>
          <p className="lead mx-auto mb-0" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
            اسمع من الآباء والمعلمين والمتخصصين الذين اختبروا الفرق.
          </p>
        </motion.header>

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
            .reviews-carousel::-webkit-scrollbar { display: none; }
            .reviews-carousel { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div
            ref={scrollRef}
            className="reviews-carousel d-flex gap-4 overflow-auto py-3"
            style={{ 
              scrollSnapType: 'x mandatory',
              padding: '0 70px'
            }}
            role="list"
            aria-label="قصص التأثير"
          >
            {reviews.map((review: Review, index: number) => (
              <motion.div
                key={index}
                style={{ 
                  flex: `0 0 ${CARD_WIDTH}px`, 
                  scrollSnapAlign: 'start',
                  maxWidth: '100%'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <ReviewCard {...review} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;