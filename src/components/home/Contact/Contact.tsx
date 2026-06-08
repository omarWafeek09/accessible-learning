// src\components\home\Contact\Contact.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Button from '../../ui/Button';
import { useTheme } from '../../../context/ThemeContext';

const contactInfo = [
  { icon: <FaPhone />, title: 'الهاتف', value: '+966 55 123 4567', desc: 'الأحد - الخميس: 9ص - 6م' },
  { icon: <FaWhatsapp />, title: 'واتساب', value: '+966 55 123 4567', desc: 'متاح 24/7' },
  { icon: <FaEnvelope />, title: 'البريد الإلكتروني', value: 'info@خطوة همة.com', desc: 'نرد خلال 24 ساعة' },
  { icon: <FaMapMarkerAlt />, title: 'الموقع', value: 'الرياض، المملكة العربية السعودية', desc: 'الرياض - حي العليا' }
];

const socialLinks = [
  { icon: <FaFacebook />, href: '#facebook', label: 'فيسبوك' },
  { icon: <FaTwitter />, href: '#twitter', label: 'تويتر' },
  { icon: <FaInstagram />, href: '#instagram', label: 'انستغرام' },
  { icon: <FaWhatsapp />, href: '#whatsapp', label: 'واتساب' }
];

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('شكراً لتواصلنا! سنرد عليك قريباً.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-5 position-relative" style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="contact-title">
      <div className="container">
        <motion.header
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>تواصل معنا</span>
          <h2 id="contact-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
            نحن هنا لمساعدتك
          </h2>
          <p className="lead mx-auto mb-0" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
            هل لديك سؤال أو تحتاج إلى مساعدة؟ لا تتردد في التواصل معنا.
          </p>
        </motion.header>

        <div className="row g-5">
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="h4 fw-bold mb-4" style={{ color: '#3c3c3c' }}>معلومات التواصل</h3>
              
              <div className="mb-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="d-flex gap-3 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: 'rgba(88, 204, 2, 0.1)',
                        color: 'var(--primary)'
                      }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <div className="fw-bold" style={{ color: 'var(--text)' }}>{info.title}</div>
                      <div style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{info.value}</div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{info.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

             
              <div 
                className="mt-4 p-4 rounded-4"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(88, 204, 2, 0.1) 0%, rgba(206, 130, 255, 0.1) 100%)' 
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaClock style={{ color: 'var(--primary)' }} />
                  <span className="fw-bold" style={{ color: 'var(--text)' }}>ساعات العمل</span>
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>الأحد - الخميس</span>
                    <span className="fw-bold" style={{ color: 'var(--text)' }}>9:00 ص - 6:00 م</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>الجمعة - السبت</span>
                    <span className="fw-bold" style={{ color: 'var(--text)' }}>مغلق</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="card border-0 p-4"
                style={{ 
                  borderRadius: '20px', 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  backgroundColor: 'var(--surface-elevated)'
                }}
              >
                <h3 className="h4 fw-bold mb-4" style={{ color: 'var(--text)' }}>أرسل لنا رسالة</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                        الاسم الكامل <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control p-3"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك"
                        style={{ 
                          borderRadius: '12px', 
                          border: '2px solid var(--border)',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text)'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                        البريد الإلكتروني <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control p-3"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        style={{ 
                          borderRadius: '12px', 
                          border: '2px solid var(--border)',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text)'
                        }}
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        className="form-control p-3"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+966 55 123 4567"
                        style={{ 
                          borderRadius: '12px', 
                          border: '2px solid var(--border)',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text)'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                        الموضوع <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <select
                        className="form-select p-3"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{ 
                          borderRadius: '12px', 
                          border: '2px solid var(--border)',
                          backgroundColor: 'var(--input-bg)',
                          color: 'var(--text)'
                        }}
                      >
                        <option value="">اختر الموضوع</option>
                        <option value="general">استفسار عام</option>
                        <option value="support">الدعم الفني</option>
                        <option value="sales">المبيعات</option>
                        <option value="partnership">الشراكة</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                      الرسالة <span style={{ color: 'var(--danger)' }}>*</span>
                    </label>
                    <textarea
                      className="form-control p-3"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                      style={{ 
                        borderRadius: '12px', 
                        border: '2px solid var(--border)',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text)',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <Button variant="primary" size="large" fullWidth>
                    <FaPaperPlane className="me-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;