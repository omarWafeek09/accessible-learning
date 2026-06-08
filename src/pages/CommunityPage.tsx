// src\pages\CommunityPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaComment, FaShare,
  FaLock, FaSearch, FaImage, FaPaperPlane,
  FaEllipsisH
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import Chatbot from '../components/ui/Chatbot';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'أم محمد',
    avatar: '',
    content: 'أخيراً بدأ ابني يقول كلمات جديدة! كل يوم ن practice معاكم وهذا النتيجة 😊',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
    likes: 24,
    comments: 8,
    date: 'منذ ساعتين'
  },
  {
    id: '2',
    author: 'أخصائية سارة',
    avatar: '',
    content: 'نصيحة لليوم: الصبر مفتاح_progress. لا تستسلم مهما بدا صعباً. كل طفل له إيقاعه الخاص في التعلم.',
    image: '',
    likes: 45,
    comments: 12,
    date: 'منذ 5 ساعات'
  },
  {
    id: '3',
    author: 'أبو Ahmed',
    avatar: '',
    content: ' Mabinak 3ala tool اهتممتوا بشراء برنامج التواصل AAC? انصحوني.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    likes: 12,
    comments: 6,
    date: 'منذ يوم'
  }
];

const CommunityPage = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('userToken');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = mockPosts.filter(post => 
    post.content.includes(searchQuery) || post.author.includes(searchQuery)
  );

  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAuthAction = () => {
    window.location.href = '/auth';
  };

  const handleLike = (postId: string) => {
    if (!isLoggedIn) {
      window.location.href = '/auth';
      return;
    }
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleBookmark = (postId: string) => {
    if (!isLoggedIn) {
      window.location.href = '/auth';
      return;
    }
    setBookmarkedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleComment = (postId: string) => {
    if (!isLoggedIn) {
      window.location.href = '/auth';
      return;
    }
    setShowComments(showComments === postId ? null : postId);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    setNewComment('');
  };

  const emojiReactions = ['👍', '❤️', '😂', '😮', '😢', '🎉'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewPostImage(null);
  };

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      setNewPostContent('');
      setNewPostImage(null);
      setIsPosting(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingTop: '80px' }}>
        <section className="py-4">
          <div className="container">
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="text-center mb-4">
                  <h2 
                    className="fw-bold"
                    style={{ 
                      color: 'var(--text)', 
                      fontSize: '2.5rem'
                    }}
                  >
                    المجتمع
                  </h2>
                </div>
                <div className="position-relative mb-4">
                  <FaSearch 
                    className="position-absolute" 
                    style={{ 
                      top: '50%', 
                      right: '20px', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-light)'
                    }} 
                  />
                  <input
                    type="text"
                    placeholder="ابحث في المجتمع..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ 
                      borderRadius: '12px', 
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      padding: '14px 50px 14px 20px'
                    }}
                  />
                </div>

                <div className="d-flex flex-column gap-4">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card border-0"
                      style={{ 
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="card-body p-0">
                        <div className="d-flex align-items-start p-3 gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ 
                              width: '40px', 
                              height: '40px',
                              backgroundColor: 'var(--primary)',
                              color: 'white',
                              fontWeight: 600
                            }}
                          >
                            {post.author.charAt(0)}
                          </motion.div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2">
                              <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.95rem' }}>{post.author}</span>
                              <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>• {post.date}</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>عام</div>
                          </div>
                          <button className="btn p-1" style={{ color: 'var(--text-light)' }}>
                            <FaEllipsisH style={{ fontSize: '1rem' }} />
                          </button>
                        </div>

                        <p className="px-3 mb-3" style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                          {post.content}
                        </p>

                        {post.image && (
                          <div className="w-100" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                            <img 
                              src={post.image} 
                              alt="" 
                              className="w-100"
                              style={{ objectFit: 'cover', maxHeight: '400px' }}
                            />
                          </div>
                        )}

                        <div className="px-3 py-2 d-flex align-items-center justify-content-between" style={{ borderBottom: '1px solid var(--border)' }}>
                          <div className="d-flex align-items-center gap-1">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '20px', height: '20px', backgroundColor: '#1877f2' }}
                            >
                              <span style={{ fontSize: '0.6rem' }}>👍</span>
                            </div>
                            <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                          </div>
                          <div className="d-flex gap-2">
                            <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{post.comments} تعليق</span>
                          </div>
                        </div>

                        <div className="px-2 py-1">
                          <div className="d-flex align-items-center justify-content-around">
                            <motion.button
                              whileHover={{ backgroundColor: 'var(--surface-elevated)' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLike(post.id)}
                              className="btn d-flex align-items-center gap-2 flex-fill justify-content-center py-2"
                              style={{ 
                                color: likedPosts.includes(post.id) ? '#1877f2' : 'var(--text-light)',
                                borderRadius: '4px'
                              }}
                            >
                              {likedPosts.includes(post.id) ? (
                                <span style={{ fontSize: '1.2rem' }}>👍</span>
                              ) : (
                                <FaHeart style={{ fontSize: '1.1rem' }} />
                              )}
                              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>إعجاب</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ backgroundColor: 'var(--surface-elevated)' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleComment(post.id)}
                              className="btn d-flex align-items-center gap-2 flex-fill justify-content-center py-2"
                              style={{ color: 'var(--text-light)', borderRadius: '4px' }}
                            >
                              <FaComment style={{ fontSize: '1.1rem' }} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>تعليق</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ backgroundColor: 'var(--surface-elevated)' }}
                              whileTap={{ scale: 0.95 }}
                              className="btn d-flex align-items-center gap-2 flex-fill justify-content-center py-2"
                              style={{ color: 'var(--text-light)', borderRadius: '4px' }}
                            >
                              <FaShare style={{ fontSize: '1.1rem' }} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>مشاركة</span>
                            </motion.button>
                          </div>
                        </div>

                        {showComments === post.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-3 pb-3"
                          >
                            <div className="d-flex flex-column gap-2 mb-3 mt-2">
                              {[
                                { author: 'أم أحمد', content: 'ما شاء الله! 🌟', time: 'منذ ساعة' },
                                { author: 'أبو خالد', content: 'مبروك 🎉', time: 'منذ 45 دقيقة' }
                              ].map((comment, idx) => (
                                <div key={idx}>
                                  <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.85rem' }}>{comment.author}</span>
                                  <span style={{ color: 'var(--text)', fontSize: '0.85rem', marginRight: '6px' }}>{comment.content}</span>
                                </div>
                              ))}
                            </div>
                            
                            {isLoggedIn ? (
                              <div className="d-flex align-items-center gap-2">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                  style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 600
                                  }}
                                >
                                  أ
                                </div>
                                <input
                                  type="text"
                                  placeholder="أضف تعليقاً..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  className="form-control border-0"
                                  style={{ 
                                    borderRadius: '20px',
                                    padding: '6px 12px',
                                    fontSize: '0.85rem',
                                    backgroundColor: 'var(--surface-elevated)'
                                  }}
                                />
                                {newComment.trim() && (
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => handleAddComment(post.id)}
                                    className="btn p-1"
                                    style={{ color: 'var(--primary)' }}
                                  >
                                    <FaPaperPlane style={{ fontSize: '0.9rem' }} />
                                  </motion.button>
                                )}
                              </div>
                            ) : (
                              <a 
                                href="/auth" 
                                style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}
                              >
                                سجل دخول للتعليق
                              </a>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {isLoggedIn ? (
                  <motion.div 
                    className="mt-4 mx-auto" 
                    style={{ 
                      borderRadius: '12px',
                      backgroundColor: 'var(--surface)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      border: '1px solid var(--border)',
                      maxWidth: '470px'
                    }}
                  >
                    <div className="p-3">
                      <div className="d-flex align-items-start gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        >
                          أ
                        </div>
                        <textarea
                          placeholder="أضف صورة..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="form-control border-0 p-0"
                          rows={1}
                          style={{ 
                            backgroundColor: 'transparent',
                            fontSize: '0.95rem',
                            lineHeight: 1.5,
                            resize: 'none',
                            color: 'var(--text)',
                            minHeight: '24px'
                          }}
                        />
                      </div>

                      {newPostImage && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="position-relative mt-2 ms-5"
                        >
                          <img 
                            src={newPostImage} 
                            alt="Preview" 
                            style={{ 
                              maxWidth: '150px',
                              maxHeight: '120px',
                              borderRadius: '4px',
                              objectFit: 'cover'
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={removeImage}
                            className="btn position-absolute d-flex align-items-center justify-content-center"
                            style={{
                              top: '-8px',
                              right: '-8px',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: '#000',
                              color: 'white',
                              border: 'none',
                              fontSize: '0.7rem'
                            }}
                          >
                            ×
                          </motion.button>
                        </motion.div>
                      )}

                      <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top" style={{ borderColor: 'var(--border)' }}>
                        <label 
                          className="btn d-flex align-items-center gap-2 p-1"
                          style={{ 
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            borderRadius: '4px'
                          }}
                        >
                          <FaImage style={{ fontSize: '1.3rem' }} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                        
                        <motion.button
                          whileHover={{ scale: newPostContent.trim() ? 1.05 : 1 }}
                          whileTap={{ scale: newPostContent.trim() ? 0.95 : 1 }}
                          onClick={handlePostSubmit}
                          disabled={!newPostContent.trim() || isPosting}
                          className="btn"
                          style={{ 
                            backgroundColor: newPostContent.trim() ? 'var(--primary)' : 'transparent',
                            color: newPostContent.trim() ? 'white' : 'var(--primary)',
                            borderRadius: '4px',
                            padding: '6px 16px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            opacity: isPosting ? 0.7 : 1
                          }}
                        >
                          {isPosting ? (
                            <span className="spinner-border spinner-border-sm" role="status" />
                          ) : (
                            'نشر'
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="mt-4 p-5 text-center" 
                    style={{ 
                      borderRadius: '24px', 
                      backgroundColor: 'var(--surface)',
                      border: '2px dashed var(--border)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div 
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                      style={{ 
                        width: '72px', 
                        height: '72px', 
                        backgroundColor: 'var(--primary)' + '15',
                      }}
                    >
                      <FaLock style={{ fontSize: '1.8rem', color: 'var(--primary)' }} />
                    </div>
                    <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--text)' }}>
                      سجّل دخول للمشاركة
                    </h3>
                    <p className="mb-4" style={{ color: 'var(--text-light)', fontSize: '1.05rem' }}>
                      شارك منشورك وأعجب بتعليقات الآخرين
                    </p>
                    <motion.a 
                      href="/auth" 
                      className="btn d-inline-flex align-items-center"
                      style={{ 
                        backgroundColor: 'var(--primary)', 
                        color: 'white',
                        borderRadius: '50px',
                        padding: '14px 36px',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تسجيل جديد
                    </motion.a>
                  </motion.div>
                )}
              </div>

              <div className="col-lg-4">
                <div 
                  className="card border-0 mb-4" 
                  style={{ 
                    borderRadius: '16px', 
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                      المجموعات الشائعة
                    </h3>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { name: 'آباء AAC', count: 450, icon: '💬', color: '#6366f1' },
                        { name: 'علاج النطق', count: 320, icon: '🗣️', color: '#8b5cf6' },
                        { name: 'مهارات حياتية', count: 280, icon: '🎯', color: '#06b6d4' },
                        { name: 'أنشطة منزلية', count: 190, icon: '🏠', color: '#f59e0b' }
                      ].map((group, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ backgroundColor: 'var(--surface-elevated)' }}
                          className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div 
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: group.color + '20',
                                fontSize: '1rem'
                              }}
                            >
                              {group.icon}
                            </div>
                            <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>{group.name}</span>
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                            {group.count}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div 
                  className="card border-0" 
                  style={{ 
                    borderRadius: '16px', 
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="card-body p-4">
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                      الأعضاء النشطين
                    </h3>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { name: 'أم أحمد', posts: 28, color: 'var(--primary)' },
                        { name: 'أبو Salman', posts: 22, color: 'var(--secondary)' },
                        { name: 'أخت Sara', posts: 18, color: '#f59e0b' },
                        { name: 'أبو Faisal', posts: 15, color: '#94a3b8' }
                      ].map((user, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ backgroundColor: 'var(--surface-elevated)' }}
                          className="d-flex align-items-center gap-2 p-2 rounded-3"
                          style={{ cursor: 'pointer' }}
                        >
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: user.color,
                              fontSize: '0.85rem'
                            }}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-grow-1">
                            <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>{user.name}</div>
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{user.posts}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
};

export default CommunityPage;