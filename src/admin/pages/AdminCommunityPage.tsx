// src\admin\pages\AdminCommunityPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaTimes, FaCheck,
  FaUser, FaComment, FaShare, FaHeart, FaFlag, FaBan, FaStar,
  FaUsers, FaBell, FaChartLine, FaCrown, FaVideo,
  FaImage, FaLink, FaSmile, FaPaperPlane
} from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'member' | 'moderator' | 'admin';
  status: 'active' | 'banned' | 'pending';
  joinedAt: string;
  posts: number;
  comments: number;
}

interface Post {
  id: string;
  authorId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  status: 'published' | 'pending' | 'flagged' | 'hidden';
  isPinned: boolean;
  isFeatured: boolean;
  createdAt: string;
  category: string;
}

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  content: string;
  likes: number;
  status: 'published' | 'flagged' | 'hidden';
  createdAt: string;
  replies: number;
}

interface Group {
  id: string;
  name: string;
  description: string;
  image?: string;
  members: number;
  posts: number;
  status: 'active' | 'private' | 'archived';
  createdAt: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'أم محمد', email: 'ammohammad@email.com', role: 'member', status: 'active', joinedAt: '2024-01-15', posts: 28, comments: 145 },
  { id: '2', name: 'أبو أحمد', email: 'abuahmed@email.com', role: 'moderator', status: 'active', joinedAt: '2023-11-20', posts: 45, comments: 230 },
  { id: '3', name: 'سارة الأخصائية', email: 'sara@email.com', role: 'admin', status: 'active', joinedAt: '2023-06-10', posts: 120, comments: 450 },
  { id: '4', name: 'خالد عمر', email: 'khaled@email.com', role: 'member', status: 'banned', joinedAt: '2024-02-01', posts: 5, comments: 12 },
  { id: '5', name: 'فاطمة أحمد', email: 'fatima@email.com', role: 'member', status: 'active', joinedAt: '2024-03-05', posts: 15, comments: 67 },
  { id: '6', name: 'علي محمود', email: 'ali@email.com', role: 'member', status: 'pending', joinedAt: '2024-04-01', posts: 0, comments: 0 },
];

const mockPosts: Post[] = [
  { id: '1', authorId: '1', author: 'أم محمد', content: 'أخيراً بدأ ابني يقول كلمات جديدة! كل يوم نمارس معاكم وهذا النتيجة 😊', images: [], likes: 24, comments: 8, shares: 3, status: 'published', isPinned: false, isFeatured: false, createdAt: '2024-04-15', category: 'إنجازات' },
  { id: '2', authorId: '2', author: 'أبو أحمد', content: 'نصيحة لليوم: الصبر مفتاح النجاح. لا تستسلم مهما بدا صعباً. كل طفل له إيقاعه الخاص في التعلم.', images: [], likes: 45, comments: 12, shares: 8, status: 'published', isPinned: true, isFeatured: true, createdAt: '2024-04-14', category: 'نصائح' },
  { id: '3', authorId: '5', author: 'فاطمة أحمد', content: 'هل استخدم أحدكم تطبيقAAC؟ هل تنصحون به؟', images: [], likes: 12, comments: 6, shares: 2, status: 'flagged', isPinned: false, isFeatured: false, createdAt: '2024-04-13', category: 'أسئلة' },
  { id: '4', authorId: '3', author: 'سارة الأخصائية', content: 'ورشة عمل جديدة الأسبوع القادم عن تطوير مهارات التواصل. سجلوا الآن!', images: [], likes: 89, comments: 34, shares: 15, status: 'published', isPinned: false, isFeatured: true, createdAt: '2024-04-12', category: 'أخبار' },
  { id: '5', authorId: '1', author: 'أم محمد', content: 'شاركنا نشاط اليوم: استخدمنا بطاقات التواصل لتعلم_colors جديدة', images: [], likes: 18, comments: 5, shares: 1, status: 'pending', isPinned: false, isFeatured: false, createdAt: '2024-04-11', category: 'أنشطة' },
];

const mockComments: Comment[] = [
  { id: '1', postId: '1', authorId: '2', author: 'أبو أحمد', content: 'ما شاء الله!_progress رائع 🎉', likes: 5, status: 'published', createdAt: '2024-04-15', replies: 2 },
  { id: '2', postId: '1', authorId: '3', author: 'سارة الأخصائية', content: 'ممتاز!继续保持', likes: 8, status: 'published', createdAt: '2024-04-15', replies: 0 },
  { id: '3', postId: '2', authorId: '5', author: 'فاطمة Ahmed', content: 'نصيحة جداً مهمة، شكراً لك', likes: 3, status: 'flagged', createdAt: '2024-04-14', replies: 1 },
  { id: '4', postId: '3', authorId: '2', author: 'أبو أحمد', content: 'نعم، أنصح به! استخدمناه مع ابني', likes: 2, status: 'published', createdAt: '2024-04-13', replies: 3 },
];

const mockGroups: Group[] = [
  { id: '1', name: 'آباء AAC', description: 'مجموعة لأولياء أمور الأطفال الذين يستخدمون تقنية AAC', members: 450, posts: 1250, status: 'active', createdAt: '2023-01-10' },
  { id: '2', name: 'علاج النطق', description: 'مناقشة موضوعات علاج النطق والتخاطب', members: 320, posts: 890, status: 'active', createdAt: '2023-03-15' },
  { id: '3', name: 'مهارات حياتية', description: 'تعلم المهارات الحياتية اليومية', members: 280, posts: 560, status: 'active', createdAt: '2023-06-20' },
  { id: '4', name: 'أنشطة منزلية', description: 'أفكار لأنشطة يمكن عملها بالمنزل', members: 190, posts: 340, status: 'private', createdAt: '2023-09-05' },
];

const categories = [
  { id: 'all', name: 'الكل', count: 156 },
  { id: 'achievements', name: 'إنجازات', count: 45 },
  { id: 'tips', name: 'نصائح', count: 38 },
  { id: 'questions', name: 'أسئلة', count: 32 },
  { id: 'activities', name: 'أنشطة', count: 25 },
  { id: 'news', name: 'أخبار', count: 16 },
];

const AdminCommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'users' | 'groups' | 'analytics'>('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [items, setItems] = useState({
    users: mockUsers,
    posts: mockPosts,
    comments: mockComments,
    groups: mockGroups
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'pending':
      case 'private':
        return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'banned':
      case 'hidden':
      case 'archived':
        return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      case 'flagged':
        return { backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' };
      default:
        return {};
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'published': return 'منشور';
      case 'pending': return 'معلق';
      case 'flagged': return 'مُبلَّغ';
      case 'hidden': return 'مخفي';
      case 'banned': return 'محظور';
      case 'private': return 'خاص';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const tabs = [
    { id: 'posts', label: 'المنشورات', icon: <FaShare />, count: items.posts.length },
    { id: 'comments', label: 'التعليقات', icon: <FaComment />, count: items.comments.length },
    { id: 'users', label: 'الأعضاء', icon: <FaUser />, count: items.users.length },
    { id: 'groups', label: 'المجموعات', icon: <FaUsers />, count: items.groups.length },
    { id: 'analytics', label: 'التحليلات', icon: <FaChartLine />, count: 0 },
  ];

  const stats = [
    { label: 'إجمالي المنشورات', value: '1,250', change: '+12%', icon: <FaShare />, color: '#8b5cf6' },
    { label: 'التعليقات', value: '4,580', change: '+8%', icon: <FaComment />, color: '#f59e0b' },
    { label: 'الأعضاء النشطين', value: '12,450', change: '+15%', icon: <FaUser />, color: '#10b981' },
    { label: 'المجموعات', value: '24', change: '+2', icon: <FaUsers />, color: '#06b6d4' },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>إدارة المجتمع</h1>
          <p style={{ color: 'var(--text-light)' }}>
            إدارة المنشورات والتعليقات والأعضاء والمجموعات
          </p>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={() => setShowModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 20px'
            }}
          >
            <FaPlus />
            إضافة جديد
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card border-0 h-100"
              style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{stat.label}</span>
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: stat.color + '20', color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="fs-3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{stat.value}</div>
                <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.8rem', color: '#10b981' }}>
                  <FaCheck style={{ fontSize: '0.7rem' }} />
                  <span>{stat.change}</span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    paddingRight: '40px'
                  }}
                />
              </div>
            </div>
            <div className="col-md-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select"
                style={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-7">
              <div className="d-flex gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className="btn d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      borderRadius: '10px',
                      backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface-elevated)',
                      color: activeTab === tab.id ? 'white' : 'var(--text)',
                      border: 'none',
                      fontSize: '0.85rem'
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <span className="px-2 py-0.5 rounded-pill" style={{ 
                      backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                      fontSize: '0.75rem'
                    }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-0">
          {activeTab === 'posts' && (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المنشور</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الناشر</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الفئة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التفاعل</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '120px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.posts.map(post => (
                    <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'var(--surface-elevated)',
                              color: 'var(--text-light)',
                              flexShrink: 0
                            }}
                          >
                            <FaImage style={{ fontSize: '0.9rem' }} />
                          </div>
                          <div style={{ maxWidth: '300px' }}>
                            <div className="text-truncate" style={{ color: 'var(--text)', fontWeight: 500 }}>{post.content}</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{post.createdAt}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary)', fontSize: '0.8rem' }}
                          >
                            {post.author.charAt(0)}
                          </div>
                          <span style={{ color: 'var(--text)' }}>{post.author}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ 
                            backgroundColor: 'var(--surface-elevated)',
                            color: 'var(--text)',
                            fontSize: '0.8rem'
                          }}
                        >
                          {post.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-3">
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}><FaHeart className="me-1" style={{ color: '#ef4444' }} />{post.likes}</span>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}><FaComment className="me-1" />{post.comments}</span>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}><FaShare className="me-1" />{post.shares}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1 flex-wrap">
                          {post.isPinned && (
                            <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.7rem' }}>مثبت</span>
                          )}
                          {post.isFeatured && (
                            <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontSize: '0.7rem' }}>مميز</span>
                          )}
                          <span className="px-2 py-1 rounded-pill" style={{ ...getStatusStyle(post.status), fontSize: '0.7rem' }}>
                            {getStatusText(post.status)}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          <button className="btn p-2" style={{ color: 'var(--primary)' }} title="تعديل"><FaEdit /></button>
                          <button className="btn p-2" style={{ color: '#f59e0b' }} title={post.isPinned ? 'إلغاء تثبيت' : 'تثبيت'}>
                            {post.isPinned ? <FaStar /> : <FaStar style={{ opacity: 0.3 }} />}
                          </button>
                          <button className="btn p-2" style={{ color: '#8b5cf6' }} title={post.isFeatured ? 'إلغاء تميز' : 'تميز'}>
                            <FaCrown />
                          </button>
                          <button className="btn p-2" style={{ color: 'var(--danger)' }} title="حذف"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المستخدم</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>البريد</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدور</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النشاط</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '120px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: '36px', height: '36px', backgroundColor: user.role === 'admin' ? '#8b5cf6' : user.role === 'moderator' ? '#f59e0b' : 'var(--primary)', fontSize: '0.9rem' }}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{user.email}</td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ 
                            backgroundColor: user.role === 'admin' ? 'rgba(139, 92, 246, 0.15)' : user.role === 'moderator' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(88, 204, 2, 0.15)',
                            color: user.role === 'admin' ? '#8b5cf6' : user.role === 'moderator' ? '#f59e0b' : 'var(--primary)',
                            fontSize: '0.8rem'
                          }}
                        >
                          {user.role === 'admin' ? 'مدير' : user.role === 'moderator' ? 'مشرف' : 'عضو'}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          {user.posts} منشور | {user.comments} تعليق
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ ...getStatusStyle(user.status), fontSize: '0.8rem' }}
                        >
                          {getStatusText(user.status)}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          <button className="btn p-2" style={{ color: 'var(--primary)' }} title="تعديل"><FaEdit /></button>
                          {user.status !== 'banned' ? (
                            <button className="btn p-2" style={{ color: '#ef4444' }} title="حظر"><FaBan /></button>
                          ) : (
                            <button className="btn p-2" style={{ color: '#10b981' }} title="إلغاء الحظر"><FaCheck /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التعليق</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الكاتب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المنشور</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التفاعل</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.comments.map(comment => (
                    <tr key={comment.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ maxWidth: '300px' }}>
                          <div className="text-truncate" style={{ color: 'var(--text)' }}>{comment.content}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{comment.createdAt}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary)', fontSize: '0.75rem' }}
                          >
                            {comment.author.charAt(0)}
                          </div>
                          <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{comment.author}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                        #{comment.postId}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          <FaHeart className="me-1" style={{ color: '#ef4444' }} />{comment.likes}
                          <FaComment className="ms-2 me-1" />{comment.replies}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ ...getStatusStyle(comment.status), fontSize: '0.8rem' }}
                        >
                          {getStatusText(comment.status)}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          <button className="btn p-2" style={{ color: 'var(--primary)' }} title="موافقة"><FaCheck /></button>
                          <button className="btn p-2" style={{ color: '#f59e0b' }} title="إبلاغ"><FaFlag /></button>
                          <button className="btn p-2" style={{ color: 'var(--danger)' }} title="حذف"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المجموعة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوصف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الأعضاء</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المنشورات</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.groups.map(group => (
                    <tr key={group.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'var(--primary)',
                              color: 'white',
                              fontSize: '1rem'
                            }}
                          >
                            <FaUsers />
                          </div>
                          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{group.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-light)', maxWidth: '250px' }}>
                        <div className="text-truncate">{group.description}</div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{group.members.toLocaleString()}</td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{group.posts.toLocaleString()}</td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ ...getStatusStyle(group.status), fontSize: '0.8rem' }}
                        >
                          {getStatusText(group.status)}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          <button className="btn p-2" style={{ color: 'var(--primary)' }} title="تعديل"><FaEdit /></button>
                          <button className="btn p-2" style={{ color: 'var(--danger)' }} title="حذف"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>أكثر المنشورات تفاعلاً</h3>
                    <div className="d-flex flex-column gap-3">
                      {items.posts.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 5).map((post, index) => (
                        <div key={post.id} className="d-flex align-items-center gap-3">
                          <span className="fw-bold" style={{ color: 'var(--primary)', width: '20px' }}>#{index + 1}</span>
                          <div className="flex-grow-1">
                            <div className="text-truncate" style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{post.content}</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{post.likes + post.comments} تفاعل</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>أكثر الأعضاء نشاطاً</h3>
                    <div className="d-flex flex-column gap-3">
                      {items.users.sort((a, b) => (b.posts + b.comments) - (a.posts + a.comments)).slice(0, 5).map((user, index) => (
                        <div key={user.id} className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{ width: '28px', height: '28px', backgroundColor: index === 0 ? '#f59e0b' : index === 1 ? '#94a3b8' : index === 2 ? '#cd7f32' : 'var(--primary)', fontSize: '0.8rem' }}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-grow-1">
                            <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>{user.name}</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{user.posts + user.comments} نشاط</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCommunityPage;