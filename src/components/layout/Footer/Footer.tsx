import { FaAccessibleIcon, FaYoutube } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { RiFacebookFill } from 'react-icons/ri';
import {GrInstagram} from 'react-icons/gr'
import { useTheme } from '../../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5" style={{ backgroundColor: 'var(--surface)', borderTop: '3px solid var(--border)' }}>
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-3 pe-lg-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaAccessibleIcon style={{ fontSize: '1.75rem', color: 'var(--primary)' }} aria-hidden="true" />
              <span className="fs-4 fw-bold" style={{ color: 'var(--text)' }}>خطوة همة</span>
            </div>
            <p className="mb-3" style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
              تمكين المتعلمين من جميع القدرات بتعليم شامل سهل الوصول. 
              انضم إلى مجتمعنا واكتشف طريقة جديدة للتعلم تحتفي بكل عقل.
            </p>
            <nav className="d-flex gap-3" aria-label="روابط وسائل التواصل الاجتماعي">
              {[
                { icon: <RiFacebookFill />, label: 'فيسبوك', href: '#facebook' ,bg:"#4d93e4" ,cl:"white" },
                { icon: <BsTwitterX />, label: 'تويتر', href: '#twitter' ,bg:"black"  ,cl:"white"},
                { icon: <GrInstagram />, label: 'انستغرام', href: '#instagram' ,bg:"linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"  ,cl:"white"},
                { icon: <FaYoutube />, label: 'يوتيوب', href: '#youtube' ,bg :"red"  ,cl:"white"}
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '12px',
                    background: social.bg,
                    color: social.cl,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    fontSize:"30px"
                  }}
                  aria-label={`تابعنا على ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </nav>
          </div>

          <div className="col-6 col-lg-3">
            <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>التعلم</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {['جميع الدورات', 'ألعاب تعليمية', 'موارد', 'تتبع التقدم'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--text-light)' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>الدعم</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {['مركز المساعدة', 'الأسئلة الشائعة', 'تواصل معنا', 'المجتمع'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--text-light)' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>الشركة</h3>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {['من نحن', 'وظائف', 'سياسة الخصوصية', 'شروط الخدمة'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--text-light)' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ borderTop: '2px solid var(--border)' }}>
          <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
            © {currentYear} خطوة همة. جميع الحقوق محفوظة.
          </p>
          <nav className="d-flex gap-4" aria-label="الروابط القانونية">
            {['الخصوصية', 'الشروط', 'ملفات تعريف الارتباط'].map((link, i) => (
              <a key={i} href="#" className="text-decoration-none" style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{link}</a>
            ))}
          </nav>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;