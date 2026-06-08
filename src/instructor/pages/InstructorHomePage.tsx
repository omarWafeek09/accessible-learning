import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaVideo, FaStar, FaClock } from 'react-icons/fa';

const stats = [
  { icon: <FaUsers />, label: 'إجمالي الطلاب', value: '450', change: '+8%', color: '#4caf50' },
  { icon: <FaBook />, label: 'دوراتي', value: '12', change: '+2%', color: '#2196f3' },
  { icon: <FaVideo />, label: 'الفيديوهات', value: '85', change: '+15%', color: '#9c27b0' },
  { icon: <FaStar />, label: 'التقييم', value: '4.8', change: '+0.2', color: '#ff9800' }
];

const recentCourses = [
  { id: 1, title: 'مقدمة في التواصل AAC', students: 150, progress: 75, status: 'منشور' },
  { id: 2, title: 'مهارات اجتماعية للمبتدئين', students: 85, progress: 60, status: 'منشور' },
  { id: 3, title: 'التواصل مع الآخرين', students: 45, progress: 30, status: 'قيد التحديث' }
];

const recentActivity = [
  { id: 1, text: 'طالب جديد في الدورة', time: 'منذ ساعة' },
  { id: 2, text: 'تسليم جديد للمهمة', time: 'منذ ساعتين' },
  { id: 3, text: 'تعليق على فيديو', time: 'منذ 3 ساعات' },
  { id: 4, text: 'تم إكمال الدرس', time: 'منذ 4 ساعات' }
];

const InstructorHomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>لوحة المدرب</h2>
      
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-xl-3" key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: stat.color + '20',
                    color: stat.color
                  }}
                >
                  {stat.icon}
                </div>
                <span 
                  className="px-3 py-1 rounded-pill"
                  style={{
                    backgroundColor: 'var(--success)',
                    color: 'white',
                    fontSize: '0.8rem'
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--text)' }}>{stat.value}</h3>
              <p className="m-0" style={{ color: 'var(--text-light)' }}>{stat.label}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div 
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <h3 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>دوراتي الأخيرة</h3>
            <div className="table-responsive">
              <table className="table" style={{ color: 'var(--text)' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th className="py-3" style={{ color: 'var(--text)' }}>العنوان</th>
                    <th className="py-3" style={{ color: 'var(--text)' }}>الطلاب</th>
                    <th className="py-3" style={{ color: 'var(--text)' }}>التقدم</th>
                    <th className="py-3" style={{ color: 'var(--text)' }}>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCourses.map(course => (
                    <tr key={course.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-3 fw-medium">{course.title}</td>
                      <td className="py-3">{course.students}</td>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            className="rounded-pill"
                            style={{
                              width: '100px',
                              height: '8px',
                              backgroundColor: 'var(--border)'
                            }}
                          >
                            <div 
                              className="rounded-pill"
                              style={{
                                width: `${course.progress}%`,
                                height: '100%',
                                backgroundColor: 'var(--success)'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{course.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span 
                          className="px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: course.status === 'منشور' ? 'var(--success)' : 'var(--warning)',
                            color: 'white',
                            fontSize: '0.8rem'
                          }}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <h3 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>النشاط الأخير</h3>
            {recentActivity.map(activity => (
              <div 
                key={activity.id}
                className="d-flex align-items-start gap-3 mb-3 pb-3"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--success)',
                    color: 'white'
                  }}
                >
                  <FaClock style={{ fontSize: '0.8rem' }} />
                </div>
                <div>
                  <p className="m-0 mb-1" style={{ color: 'var(--text)' }}>{activity.text}</p>
                  <small style={{ color: 'var(--text-light)' }}>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorHomePage;