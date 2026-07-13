import { memo, useState } from 'react';
import { FaStar, FaClock, FaPlayCircle, FaUsers, FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  thumbnail: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  lessons?: number;
  students?: number;
  rating?: number;
  instructor?: string;
  instructorAvatar?: string;
  price?: string;
  isFree?: boolean;
}

const levelConfig: Record<string, { bg: string; color: string; label: string }> = {
  'مبتدئ': { bg: 'rgba(88, 204, 2, 0.15)', color: '#58cc02', label: 'مبتدئ' },
  'متوسط': { bg: 'rgba(255, 193, 7, 0.15)', color: '#ffc800', label: 'متوسط' },
  'متقدم': { bg: 'rgba(220, 53, 69, 0.15)', color: '#dc3545', label: 'متقدم' },
};

const CourseCard = memo(({
  thumbnail,
  title,
  category,
  duration,
  level,
  lessons = 12,
  students = 850,
  rating = 4.8,
  instructor = 'فريق متخصص',
  instructorAvatar = 'https://i.pravatar.cc/150?img=11',
  price = 'مجاني',
  isFree = true
}: CourseCardProps) => {
  const [favorited, setFavorited] = useState(false);

  const handleClick = () => {
     window.location.href = '/course/1';
  };

  const levelInfo = levelConfig[level] || levelConfig['مبتدئ'];

  const levelBadgeStyle = {
    backgroundColor: levelInfo.bg,
    color: levelInfo.color,
  };

  return (
    <article
      className={styles.card}
      tabIndex={0}
      role="button"
      aria-label={`الدورة: ${title}. المستوى: ${level}. المدة: ${duration}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.imageWrapper}>
        <img
          src={thumbnail}
          alt=""
          className={styles.image}
        />
        <div className={styles.gradient} />

        <div className={`${styles.priceBadge} ${isFree ? styles.priceFree : styles.pricePaid}`}>
          {price}
        </div>

        <button
          className={styles.favoriteBtn}
          onClick={(e) => { e.stopPropagation(); setFavorited(!favorited); }}
          aria-label={favorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          {favorited ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className={styles.levelBadge} style={levelBadgeStyle}>
          <span className={styles.levelDot} style={{ backgroundColor: levelInfo.color }} aria-hidden="true" />
          {level}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.topRow}>
          <span className={styles.categoryBadge}>{category}</span>
          <div className={styles.rating}>
            <FaStar className={styles.ratingStar} />
            <span className={styles.ratingValue}>{rating}</span>
          </div>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <div className={styles.instructorRow}>
          <img
            src={instructorAvatar}
            alt=""
            className={styles.avatar}
          />
          <div>
            <span className={styles.instructorLabel}>المدرب</span>
            <span className={styles.instructorName}>{instructor}</span>
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <FaClock className={styles.metaIcon} />
            {duration}
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}>
            <FaPlayCircle className={styles.metaIcon} />
            {lessons} درس
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}>
            <FaUsers className={styles.metaIcon} />
            {students}+
          </span>
          {isFree && <span className={styles.freeTag}>مجاني</span>}
        </div>
      </div>
    </article>
  );
});

export default CourseCard;
