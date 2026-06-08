import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaChevronLeft, FaChevronRight, FaClock, FaCalendar, FaTasks, FaCheck, FaTrash, FaEdit, FaTimes, FaPlay, FaPause } from 'react-icons/fa';

interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface HourLog {
  id: string;
  date: string;
  hours: number;
  task: string;
  category: string;
  description: string;
}

const exampleTodos: Todo[] = [
  { id: '1', title: 'مراجعة بروتوكول علاجي', description: 'بروتوكول تحسين النطق', date: '2024-01-15', time: '10:00', duration: 60, completed: false, priority: 'high', category: 'treatment' },
  { id: '2', title: 'اجتماع مع فريق العمل', description: 'مناقشة خطط التوسع', date: '2024-01-15', time: '14:00', duration: 90, completed: true, priority: 'medium', category: 'meeting' },
  { id: '3', title: 'تقييم طالب جديد', description: 'تقييم أولي لطالب التوحد', date: '2024-01-16', time: '09:00', duration: 120, completed: false, priority: 'high', category: 'evaluation' },
  { id: '4', title: 'تحديث قاعدة البيانات', description: 'إضافة بيانات البروتوكولات', date: '2024-01-17', time: '11:00', duration: 60, completed: false, priority: 'low', category: 'admin' },
  { id: '5', title: 'ورشة عمل للأهل', description: 'ورشة عن التعامل مع أطفال التوحد', date: '2024-01-18', time: '16:00', duration: 180, completed: false, priority: 'medium', category: 'workshop' },
];

const exampleHourLogs: HourLog[] = [
  { id: '1', date: '2024-01-14', hours: 4, task: 'جلسات علاجية', category: 'treatment', description: '4 جلسات لكل طفل' },
  { id: '2', date: '2024-01-14', hours: 2, task: 'إعداد التقارير', category: 'admin', description: 'كتابة تقارير الجلسات' },
  { id: '3', date: '2024-01-13', hours: 6, task: 'جلسات علاجية', category: 'treatment', description: '6 جلسات لكل طفل' },
  { id: '4', date: '2024-01-13', hours: 1.5, task: 'اجتماع الفريق', category: 'meeting', description: 'اجتماع أسبوعي' },
  { id: '5', date: '2024-01-12', hours: 3, task: 'تدريب المعلمين', category: 'training', description: 'ورشة تدريبية للمعلمين' },
  { id: '6', date: '2024-01-12', hours: 5, task: 'جلسات علاجية', category: 'treatment', description: '5 جلسات لكل طفل' },
];

const categoryColors: Record<string, { bg: string; color: string; label: string }> = {
  treatment: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', label: 'جلسات علاجية' },
  meeting: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', label: 'اجتماعات' },
  evaluation: { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', label: 'تقييمات' },
  admin: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b', label: 'إداري' },
  workshop: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', label: 'ورش عمل' },
  training: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', label: 'تدريب' },
};

const priorityColors: Record<string, { bg: string; color: string }> = {
  low: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
  medium: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  high: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
};

const AdminSchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15));
  const [view, setView] = useState<'week' | 'month'>('week');
  const [todos, setTodos] = useState<Todo[]>(exampleTodos);
  const [hourLogs, setHourLogs] = useState<HourLog[]>(exampleHourLogs);
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks' | 'hours'>('calendar');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddHourModal, setShowAddHourModal] = useState(false);

  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'treatment'
  });

  const [newHour, setNewHour] = useState({
    date: '',
    hours: 0,
    task: '',
    category: 'treatment',
    description: ''
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(new Date(year, month, -i));
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    for (let i = 1; i <= 42 - days.length; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getWeekDays = () => {
    const days: Date[] = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const getTodosForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return todos.filter(t => t.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleAddTodo = () => {
    if (!newTodo.title || !newTodo.date) {
      alert('الرجاء إدخال العنوان والتاريخ');
      return;
    }

    const todo: Todo = {
      id: Date.now().toString(),
      ...newTodo,
      completed: false
    };

    setTodos([todo, ...todos]);
    setShowAddModal(false);
    setNewTodo({ title: '', description: '', date: '', time: '', duration: 60, priority: 'medium', category: 'treatment' });
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleAddHour = () => {
    if (!newHour.date || !newHour.task || newHour.hours <= 0) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const hour: HourLog = {
      id: Date.now().toString(),
      ...newHour
    };

    setHourLogs([hour, ...hourLogs]);
    setShowAddHourModal(false);
    setNewHour({ date: '', hours: 0, task: '', category: 'treatment', description: '' });
  };

  const totalHoursThisWeek = hourLogs
    .filter(h => {
      const logDate = new Date(h.date);
      const now = new Date(2024, 0, 15);
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo && logDate <= now;
    })
    .reduce((sum, h) => sum + h.hours, 0);

  const days = view === 'month' ? getDaysInMonth(currentDate) : getWeekDays();
  const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>الجدول والساعات</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {totalHoursThisWeek.toFixed(1)} ساعة هذا الأسبوع
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
          >
            <FaPlus />
            <span>إضافة مهمة</span>
          </button>
          <button
            onClick={() => setShowAddHourModal(true)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{ backgroundColor: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '12px' }}
          >
            <FaClock />
            <span>تسجيل ساعة</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 d-flex gap-2"
      >
        {[
          { id: 'calendar', label: 'التقويم', icon: <FaCalendar /> },
          { id: 'tasks', label: 'المهام', icon: <FaTasks /> },
          { id: 'hours', label: 'الساعات', icon: <FaClock /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === tab.id ? 'white' : 'var(--text)',
              border: `2px solid ${activeTab === tab.id ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: '12px'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {activeTab === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="p-3 d-flex justify-content-between align-items-center">
              <button
                onClick={() => navigateMonth(-1)}
                className="btn d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
              >
                <FaChevronRight style={{ color: 'var(--text)' }} />
              </button>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.2rem' }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={() => setView('week')}
                  className="btn px-3 py-1"
                  style={{
                    backgroundColor: view === 'week' ? 'var(--primary)' : 'transparent',
                    color: view === 'week' ? 'white' : 'var(--text)',
                    border: `1px solid ${view === 'week' ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '8px'
                  }}
                >
                  أسبوع
                </button>
                <button
                  onClick={() => setView('month')}
                  className="btn px-3 py-1"
                  style={{
                    backgroundColor: view === 'month' ? 'var(--primary)' : 'transparent',
                    color: view === 'month' ? 'white' : 'var(--text)',
                    border: `1px solid ${view === 'month' ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '8px'
                  }}
                >
                  شهر
                </button>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="btn d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
              >
                <FaChevronLeft style={{ color: 'var(--text)' }} />
              </button>
            </div>

            <div className="px-3 pb-3">
              <div className="d-flex gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center flex-fill py-2" style={{ color: 'var(--text-light)', fontWeight: 500 }}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-1">
                {days.map((day, index) => {
                  const dateStr = formatDate(day);
                  const dayTodos = getTodosForDate(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = dateStr === '2024-01-15';

                  return (
                    <div
                      key={index}
                      className="p-2"
                      style={{
                        flex: view === 'month' ? '0 0 calc(14.28% - 4px)' : '0 0 calc(14.28% - 4px)',
                        minHeight: '80px',
                        backgroundColor: isToday ? 'rgba(88, 204, 2, 0.1)' : 'var(--surface-elevated)',
                        borderRadius: '8px',
                        border: isToday ? '2px solid var(--primary)' : '1px solid var(--border)',
                        opacity: isCurrentMonth ? 1 : 0.5
                      }}
                    >
                      <div className="fw-bold mb-1" style={{ color: isToday ? 'var(--primary)' : 'var(--text)', fontSize: '0.9rem' }}>
                        {day.getDate()}
                      </div>
                      {dayTodos.slice(0, 2).map(todo => (
                        <div
                          key={todo.id}
                          className="mb-1 px-1 py-1 rounded"
                          style={{
                            backgroundColor: categoryColors[todo.category]?.bg || 'var(--surface)',
                            fontSize: '0.7rem',
                            color: categoryColors[todo.category]?.color || 'var(--text)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {todo.time} {todo.title}
                        </div>
                      ))}
                      {dayTodos.length > 2 && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>+{dayTodos.length - 2}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'tasks' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="d-flex flex-column gap-3"
        >
          {todos.map(todo => (
            <div key={todo.id} className="card border-0" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
              <div className="p-3 d-flex align-items-center gap-3">
                <button
                  onClick={() => handleToggleTodo(todo.id)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: todo.completed ? 'var(--primary)' : 'transparent',
                    border: `2px solid ${todo.completed ? 'var(--primary)' : 'var(--border)'}`
                  }}
                >
                  {todo.completed && <FaCheck style={{ color: 'white', fontSize: '0.8rem' }} />}
                </button>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className={`fw-bold ${todo.completed ? 'text-decoration-line-through' : ''}`} style={{ color: 'var(--text)' }}>
                      {todo.title}
                    </span>
                    <span className="badge" style={{ backgroundColor: priorityColors[todo.priority].bg, color: priorityColors[todo.priority].color, fontSize: '0.7rem' }}>
                      {todo.priority === 'high' ? 'عالية' : todo.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    {todo.description} • {todo.date} • {todo.time} • {todo.duration} دقيقة
                  </div>
                </div>
                <span className="badge" style={{ backgroundColor: categoryColors[todo.category]?.bg, color: categoryColors[todo.category]?.color }}>
                  {categoryColors[todo.category]?.label}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)' }}
                >
                  <FaTrash style={{ color: 'var(--danger)', fontSize: '0.8rem' }} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'hours' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="row mb-4">
            {Object.entries(categoryColors).map(([key, val]) => {
              const total = hourLogs.filter(h => h.category === key).reduce((sum, h) => sum + h.hours, 0);
              return (
                <div key={key} className="col-md-2 col-6 mb-3">
                  <div className="card border-0 p-3 text-center" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
                    <div className="fw-bold" style={{ color: val.color, fontSize: '1.5rem' }}>{total}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{val.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المهمة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الفئة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوصف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الساعات</th>
                  </tr>
                </thead>
                <tbody>
                  {hourLogs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{log.date}</td>
                      <td style={{ padding: '16px', color: 'var(--text)', fontWeight: 500 }}>{log.task}</td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge" style={{ backgroundColor: categoryColors[log.category]?.bg, color: categoryColors[log.category]?.color }}>
                          {categoryColors[log.category]?.label}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{log.description}</td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>{log.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {showAddModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة مهمة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>العنوان</label>
              <input type="text" className="form-control p-3" value={newTodo.title} onChange={e => setNewTodo({ ...newTodo, title: e.target.value })} placeholder="أدخل عنوان المهمة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوصف</label>
              <textarea className="form-control p-3" value={newTodo.description} onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} placeholder="أدخل وصف المهمة" rows={2} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', resize: 'none' }} />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>التاريخ</label>
                <input type="date" className="form-control p-3" value={newTodo.date} onChange={e => setNewTodo({ ...newTodo, date: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوقت</label>
                <input type="time" className="form-control p-3" value={newTodo.time} onChange={e => setNewTodo({ ...newTodo, time: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المدة (دقيقة)</label>
                <input type="number" className="form-control p-3" value={newTodo.duration} onChange={e => setNewTodo({ ...newTodo, duration: parseInt(e.target.value) })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الأولوية</label>
                <select className="form-select p-3" value={newTodo.priority} onChange={e => setNewTodo({ ...newTodo, priority: e.target.value as any })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
            </div>
            <button onClick={handleAddTodo} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaPlus className="me-2" /> إضافة المهمة
            </button>
          </div>
        </div>
      )}

      {showAddHourModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddHourModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>تسجيل ساعة عمل</h3>
              <button onClick={() => setShowAddHourModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>التاريخ</label>
                <input type="date" className="form-control p-3" value={newHour.date} onChange={e => setNewHour({ ...newHour, date: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الساعات</label>
                <input type="number" className="form-control p-3" value={newHour.hours || ''} onChange={e => setNewHour({ ...newHour, hours: parseFloat(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المهمة</label>
              <input type="text" className="form-control p-3" value={newHour.task} onChange={e => setNewHour({ ...newHour, task: e.target.value })} placeholder="أدخل اسم المهمة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الفئة</label>
              <select className="form-select p-3" value={newHour.category} onChange={e => setNewHour({ ...newHour, category: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                {Object.entries(categoryColors).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوصف</label>
              <textarea className="form-control p-3" value={newHour.description} onChange={e => setNewHour({ ...newHour, description: e.target.value })} placeholder="أدخل وصف العمل" rows={2} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', resize: 'none' }} />
            </div>
            <button onClick={handleAddHour} className="btn w-100 py-3" style={{ backgroundColor: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaClock className="me-2" /> تسجيل الساعات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedulePage;