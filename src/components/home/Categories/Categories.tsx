import { FaRegHandPointer } from 'react-icons/fa';
import { RiBrain2Line } from "react-icons/ri";
import {  TiEyeOutline } from "react-icons/ti";
import { PiCloverLight} from "react-icons/pi";
import { LuBookMarked } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";


import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { style } from 'framer-motion/client';

const categories = [
  {
    icon: <TiEyeOutline aria-hidden="true" />,
    title: 'التعلم البصري',
    description: 'دروس قائمة على الصور وأدوات بصرية لتعزيز الفهم.'
  },
  {
    icon: <RiBrain2Line aria-hidden="true" />,
    title: 'التنمية المعرفية',
    description: 'أنشطة مصممة لتقوية مهارات التفكير وحل المشكلات.'
  },
  {
    icon: <FaRegHandPointer aria-hidden="true" />,
    title: 'المهارات الحركية',
    description: 'تمارين حركية دقيقة وأكثر للبناء الجسدي.'
  },
  {
    icon: <TbUsersGroup aria-hidden="true" />,
    title: 'المهارات الاجتماعية',
    description: 'دروس تفاعلية حول التواصل وبناء العلاقات.'
  },
  {
    icon: <LuBookMarked aria-hidden="true" />,
    title: 'القراءة والكتابة',
    description: 'برامج محو أمية مخصصة لاحتياجات التعلم المتنوعة.'
  },
  {
    icon: <PiCloverLight aria-hidden="true" />,
    title: 'النمو العاطفي',
    description: 'موارد للتنظيم العاطفي والوعي الذاتي.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const Categories = () => (
  <section className="py-5 position-relative"  style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="categories-title">
    <div className="container">
      <motion.header
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>الفئات</span>
        <h2 id="categories-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
          مسارات تعليمية متنوعة
        </h2>
        <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
          اكتشف مجالات تعلم مصممة خصيصاً لتناسب احتياجات كل متعلم.
        </p>
      </motion.header>

      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category, index) => (
          <motion.div key={index} className="col-12 col-md-6 col-lg-4" variants={itemVariants}>
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Categories;