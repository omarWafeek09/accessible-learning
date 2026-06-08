// src\admin\pages\AdminGamesPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes,
  FaGamepad, FaFolder, FaImage, FaPlay, FaStar,
  FaFile, FaVideo, FaMusic, FaPlusCircle
} from 'react-icons/fa';

interface GameCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gameCount: number;
  status: 'active' | 'hidden';
}

interface GameAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'file';
  url: string;
  size: string;
}

interface GameSettings {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timer: boolean;
  timerDuration: number;
  hints: boolean;
  maxHints: number;
  soundEffects: boolean;
  backgroundMusic: boolean;
  responsive: boolean;
}

interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  ageRange: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  status: 'published' | 'draft' | 'archived';
  plays: number;
  rating: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  assets: GameAsset[];
  settings: GameSettings;
  instructions: string;
  learningObjectives: string[];
  tags: string[];
}

const mockCategories: GameCategory[] = [
  { id: '1', name: 'ألعاب الذاكرة', description: 'تمارين لتنمية الذاكرة والتركيز', icon: 'FaBrain', color: '#8b5cf6', gameCount: 12, status: 'active' },
  { id: '2', name: 'ألعاب بصرية', description: 'ألعاب لتحسين المهارات البصرية', icon: 'FaEye', color: '#10b981', gameCount: 8, status: 'active' },
  { id: '3', name: 'ألعاب سمعية', description: 'تمارين سمعية للأطفال', icon: 'FaVolumeUp', color: '#f59e0b', gameCount: 6, status: 'active' },
  { id: '4', name: 'ألعاب حس حركية', description: 'ألعاب لتطوير المهارات الحركية', icon: 'FaPuzzlePiece', color: '#ef4444', gameCount: 10, status: 'active' },
  { id: '5', name: 'ألعاب تفكير', description: 'ألعاب لتنمية مهارات التفكير', icon: 'FaBrain', color: '#06b6d4', gameCount: 15, status: 'active' },
];

const defaultSettings: GameSettings = {
  difficulty: 'beginner',
  timer: false,
  timerDuration: 60,
  hints: true,
  maxHints: 3,
  soundEffects: true,
  backgroundMusic: true,
  responsive: true
};

const mockGames: Game[] = [
  { id: '1', title: 'مطابقة الصور', description: 'لعبة مطابقة الصور المتشابهة لتنمية الذاكرة', category: 'ألعاب الذاكرة', thumbnail: '', ageRange: '3-6', difficulty: 'beginner', duration: '10 دقائق', status: 'published', plays: 1250, rating: 4.5, isPremium: false, createdAt: '2024-01-15', updatedAt: '2024-01-15', assets: [{ id: 'a1', name: 'صورة1.png', type: 'image', url: '', size: '2MB' }], settings: defaultSettings, instructions: 'قم بمطابقة الصور', learningObjectives: ['تنمية الذاكرة'], tags: ['ذاكرة', 'بصري'] },
  { id: '2', title: 'البحث عن الشكل', description: 'ابحث عن الشكل المخفي بين الأشكال', category: 'ألعاب بصرية', thumbnail: '', ageRange: '4-7', difficulty: 'intermediate', duration: '15 دقيقة', status: 'published', plays: 890, rating: 4.2, isPremium: true, createdAt: '2024-01-20', updatedAt: '2024-01-20', assets: [], settings: { ...defaultSettings, difficulty: 'intermediate' }, instructions: 'ابحث عن الشكل', learningObjectives: ['التركيز'], tags: ['بصري'] },
  { id: '3', title: 'تعلم الحروف', description: 'تعلم الحروف العربية بشكل تفاعلي', category: 'ألعاب تفكير', thumbnail: '', ageRange: '2-5', difficulty: 'beginner', duration: '20 دقيقة', status: 'published', plays: 2100, rating: 4.8, isPremium: false, createdAt: '2024-02-01', updatedAt: '2024-02-01', assets: [], settings: defaultSettings, instructions: 'تعلم الحروف', learningObjectives: ['اللغة'], tags: ['حروف', 'لغة'] },
  { id: '4', title: 'لعبة الألوان', description: 'تعلم الألوان ومطابقتها', category: 'ألعاب بصرية', thumbnail: '', ageRange: '2-4', difficulty: 'beginner', duration: '8 دقائق', status: 'draft', plays: 0, rating: 0, isPremium: false, createdAt: '2024-02-10', updatedAt: '2024-02-10', assets: [], settings: defaultSettings, instructions: 'مطابقة الألوان', learningObjectives: ['التمييز'], tags: ['ألوان'] },
  { id: '5', title: 'القطع المتساقطة', description: 'لعبة قطع الأشكال المتساقطة', category: 'ألعاب حس حركية', thumbnail: '', ageRange: '5-8', difficulty: 'advanced', duration: '25 دقيقة', status: 'published', plays: 560, rating: 4.0, isPremium: true, createdAt: '2024-02-15', updatedAt: '2024-02-15', assets: [], settings: { ...defaultSettings, difficulty: 'advanced', timer: true, timerDuration: 120 }, instructions: 'قطعة الأشكال', learningObjectives: ['الحركية'], tags: ['حركي'] },
  { id: '6', title: 'الاصواتAnimals', description: 'تعلم أصوات الحيوانات', category: 'ألعاب سمعية', thumbnail: '', ageRange: '3-6', difficulty: 'beginner', duration: '12 دقيقة', status: 'published', plays: 780, rating: 4.3, isPremium: false, createdAt: '2024-02-20', updatedAt: '2024-02-20', assets: [], settings: defaultSettings, instructions: 'استمع للحيوانات', learningObjectives: ['السمع'], tags: ['صوت', 'حيوانات'] },
];

const AdminGamesPage = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'categories'>('games');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'game' | 'category'>('game');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeGameTab, setActiveGameTab] = useState<'info' | 'assets' | 'settings' | 'stats'>('info');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [games, setGames] = useState<Game[]>(mockGames);
  const [categories, setCategories] = useState<GameCategory[]>(mockCategories);

  const [newItem, setNewItem] = useState<any>({
    title: '', description: '', category: '', ageRange: '', difficulty: 'beginner', duration: '', isPremium: false, status: 'draft', name: '', color: '#8b5cf6'
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published': return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'draft': return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'archived': return { backgroundColor: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' };
      default: return {};
    }
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = { published: 'منشور', draft: 'مسودة', archived: 'مؤرشف' };
    return texts[status] || status;
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'intermediate': return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'advanced': return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      default: return {};
    }
  };

  const getDifficultyText = (difficulty: string) => {
    const texts: Record<string, string> = { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' };
    return texts[difficulty] || difficulty;
  };

  const handleAddItem = () => {
    if (modalType === 'game') {
      const game: Game = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description,
        category: newItem.category,
        thumbnail: '',
        ageRange: newItem.ageRange,
        difficulty: newItem.difficulty as 'beginner' | 'intermediate' | 'advanced',
        duration: newItem.duration,
        status: newItem.status as 'published' | 'draft' | 'archived',
        plays: 0,
        rating: 0,
        isPremium: newItem.isPremium,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        assets: [],
        settings: { ...defaultSettings, difficulty: newItem.difficulty as 'beginner' | 'intermediate' | 'advanced' },
        instructions: '',
        learningObjectives: [],
        tags: []
      };
      setGames([game, ...games]);
    } else if (modalType === 'category') {
      const category: GameCategory = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description,
        icon: 'FaFolder',
        color: newItem.color,
        gameCount: 0,
        status: 'active'
      };
      setCategories([...categories, category]);
    }
    setShowModal(false);
    setNewItem({ title: '', description: '', category: '', ageRange: '', difficulty: 'beginner', duration: '', isPremium: false, status: 'draft', name: '', color: '#8b5cf6' });
  };

  const openModal = (type: 'game' | 'category') => {
    setModalType(type);
    setShowModal(true);
  };

  const updateGame = (gameId: string, field: string, value: any) => {
    const updated = games.map(g => {
      if (g.id === gameId) {
        if (field === 'settings') {
          return { ...g, settings: { ...g.settings, ...value } };
        }
        return { ...g, [field]: value };
      }
      return g;
    });
    setGames(updated);
    const game = games.find(g => g.id === gameId);
    if (game) {
      if (field === 'settings') {
        setSelectedGame({ ...game, settings: { ...game.settings, ...value } });
      } else {
        setSelectedGame({ ...game, [field]: value });
      }
    }
  };

  const tabs = [
    { id: 'games', label: 'الألعاب', icon: <FaGamepad />, count: games.length },
    { id: 'categories', label: 'الفئات', icon: <FaFolder />, count: categories.length },
  ];

  const stats = [
    { label: 'إجمالي الألعاب', value: games.length, icon: <FaGamepad />, color: '#8b5cf6' },
    { label: 'الألعاب المنشورة', value: games.filter(g => g.status === 'published').length, icon: <FaPlay />, color: '#10b981' },
    { label: 'الألعاب المميزة', value: games.filter(g => g.isPremium).length, icon: <FaStar />, color: '#f59e0b' },
    { label: 'إجمالي اللعب', value: games.reduce((sum, g) => sum + g.plays, 0).toLocaleString(), icon: <FaPlay />, color: '#06b6d4' },
  ];

  const filteredGames = games.filter(g => searchTerm === '' || g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>إدارة الألعاب</h1>
          <p style={{ color: 'var(--text-light)' }}>إدارة الألعاب والفئات</p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={() => openModal('category')} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px' }}>
            <FaPlus /> فئة جديدة
          </button>
          <button onClick={() => openModal('game')} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px' }}>
            <FaPlus /> لعبة جديدة
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: stat.color + '20' }}>
                  <span style={{ color: stat.color, fontSize: '1.25rem' }}>{stat.icon}</span>
                </div>
                <div>
                  <div className="fs-4 fw-bold" style={{ color: 'var(--text)' }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{stat.label}</div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="d-flex align-items-center gap-3 mb-4" style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className="btn d-flex align-items-center gap-2 px-3 py-2" style={{ borderRadius: '8px', backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'transparent', color: activeTab === tab.id ? 'white' : 'var(--text-light)', border: 'none' }}>
            {tab.icon}
            {tab.label}
            <span className="badge" style={{ backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--surface-elevated)', color: activeTab === tab.id ? 'white' : 'var(--text-light)' }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {activeTab === 'games' && (
        <>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="position-relative flex-grow-1" style={{ maxWidth: '400px' }}>
              <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input type="text" placeholder="البحث في الألعاب..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control" style={{ paddingRight: '40px', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            {categories.map(category => {
              const categoryGames = filteredGames.filter(g => g.category === category.name);
              const isCategoryExpanded = expandedCategory === category.name;
              if (categoryGames.length === 0) return null;
              return (
                <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center justify-content-between p-3" style={{ cursor: 'pointer', backgroundColor: category.color + '10' }} onClick={() => setExpandedCategory(isCategoryExpanded ? null : category.name)}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: category.color + '20' }}>
                          <FaFolder style={{ color: category.color, fontSize: '1.25rem' }} />
                        </div>
                        <div>
                          <h3 className="h6 fw-bold mb-0" style={{ color: 'var(--text)' }}>{category.name}</h3>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{categoryGames.length} لعبة</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span style={{ color: 'var(--text-light)', fontSize: '1.25rem' }}>{isCategoryExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>
                    {isCategoryExpanded && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-top" style={{ borderColor: 'var(--border)' }}>
                        <div className="p-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                          <div className="d-flex flex-column gap-2">
                            {categoryGames.map((game, idx) => {
                              const isGameExpanded = selectedGame?.id === game.id;
                              return (
                                <motion.div key={game.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="card border-0" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
                                  <div className="card-body p-0">
                                    <div className="d-flex align-items-center justify-content-between p-3" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setSelectedGame(isGameExpanded ? null : game); }}>
                                      <div className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: category.color + '20' }}>
                                          <FaGamepad style={{ color: category.color, fontSize: '1rem' }} />
                                        </div>
                                        <div>
                                          <div className="d-flex align-items-center gap-2">
                                            <h4 className="h6 fw-bold mb-0" style={{ color: 'var(--text)' }}>{game.title}</h4>
                                            {game.isPremium && <FaStar style={{ color: '#f59e0b', fontSize: '0.8rem' }} />}
                                          </div>
                                          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{game.duration}</span>
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-center gap-2">
                                        <span className="px-2 py-1 rounded-pill" style={{ ...getDifficultyStyle(game.difficulty), fontSize: '0.65rem' }}>{getDifficultyText(game.difficulty)}</span>
                                        <span className="px-2 py-1 rounded-pill" style={{ ...getStatusStyle(game.status), fontSize: '0.65rem' }}>{getStatusText(game.status)}</span>
                                        <div className="d-flex align-items-center gap-1"><FaPlay style={{ fontSize: '0.7rem', color: 'var(--text-light)' }} /><span style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>{game.plays.toLocaleString()}</span></div>
                                        <span style={{ color: 'var(--text-light)', fontSize: '1rem' }}>{isGameExpanded ? '▲' : '▼'}</span>
                                      </div>
                                    </div>
                                    {isGameExpanded && (
                                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-top" style={{ borderColor: 'var(--border)' }}>
                                        <div className="p-3" style={{ backgroundColor: 'var(--surface)' }}>
                                          <div className="d-flex gap-2 mb-3" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                                            <button onClick={() => setActiveGameTab('info')} className="btn" style={{ backgroundColor: activeGameTab === 'info' ? 'var(--primary)' : 'transparent', color: activeGameTab === 'info' ? 'white' : 'var(--text-light)', borderRadius: '6px', fontSize: '0.8rem' }}>المعلومات</button>
                                            <button onClick={() => setActiveGameTab('assets')} className="btn" style={{ backgroundColor: activeGameTab === 'assets' ? 'var(--primary)' : 'transparent', color: activeGameTab === 'assets' ? 'white' : 'var(--text-light)', borderRadius: '6px', fontSize: '0.8rem' }}>الملفات</button>
                                            <button onClick={() => setActiveGameTab('settings')} className="btn" style={{ backgroundColor: activeGameTab === 'settings' ? 'var(--primary)' : 'transparent', color: activeGameTab === 'settings' ? 'white' : 'var(--text-light)', borderRadius: '6px', fontSize: '0.8rem' }}>الإعدادات</button>
                                            <button onClick={() => setActiveGameTab('stats')} className="btn" style={{ backgroundColor: activeGameTab === 'stats' ? 'var(--primary)' : 'transparent', color: activeGameTab === 'stats' ? 'white' : 'var(--text-light)', borderRadius: '6px', fontSize: '0.8rem' }}>الإحصائيات</button>
                                          </div>
                                          {activeGameTab === 'info' && (
                                            <div className="row g-3">
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>اسم اللعبة</div><input type="text" value={game.title} onChange={(e) => updateGame(game.id, 'title', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الفئة</div><select value={game.category} onChange={(e) => updateGame(game.id, 'category', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>العمر</div><input type="text" value={game.ageRange} onChange={(e) => updateGame(game.id, 'ageRange', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المدة</div><input type="text" value={game.duration} onChange={(e) => updateGame(game.id, 'duration', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المستوى</div><select value={game.difficulty} onChange={(e) => updateGame(game.id, 'difficulty', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}><option value="beginner">مبتدئ</option><option value="intermediate">متوسط</option><option value="advanced">متقدم</option></select></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الحالة</div><select value={game.status} onChange={(e) => updateGame(game.id, 'status', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}><option value="published">منشور</option><option value="draft">مسودة</option><option value="archived">مؤرشف</option></select></div>
                                              <div className="col-12"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الوصف</div><textarea value={game.description} onChange={(e) => updateGame(game.id, 'description', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} rows={2} /></div>
                                              <div className="col-12"><div className="form-check"><input type="checkbox" checked={game.isPremium} onChange={(e) => updateGame(game.id, 'isPremium', e.target.checked)} className="form-check-input" id={`premium-${game.id}`} /><label className="form-check-label" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>لعبة مميزة</label></div></div>
                                            </div>
                                          )}
                                          {activeGameTab === 'assets' && (
                                            <div>
                                              {game.assets && game.assets.length > 0 ? (
                                                <div className="d-flex flex-column gap-2">
                                                  {game.assets.map(asset => (
                                                    <div key={asset.id} className="d-flex align-items-center justify-content-between p-2 rounded" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                                                      <div className="d-flex align-items-center gap-2">
                                                        {asset.type === 'image' && <FaImage style={{ color: '#10b981' }} />}
                                                        {asset.type === 'video' && <FaVideo style={{ color: '#f59e0b' }} />}
                                                        {asset.type === 'audio' && <FaMusic style={{ color: '#8b5cf6' }} />}
                                                        {asset.type === 'file' && <FaFile style={{ color: '#6b7280' }} />}
                                                        <span style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{asset.name}</span>
                                                      </div>
                                                      <div className="d-flex align-items-center gap-2">
                                                        <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{asset.size}</span>
                                                        <button className="btn p-1" style={{ color: 'var(--danger)' }} onClick={() => updateGame(game.id, 'assets', game.assets.filter(a => a.id !== asset.id))}><FaTrash /></button>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : (
                                                <div className="text-center py-3" style={{ color: 'var(--text-light)' }}>لا توجد ملفات</div>
                                              )}
                                              <button className="btn w-100 mt-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '6px', fontSize: '0.85rem' }}><FaPlusCircle className="me-2" /> إضافة ملف</button>
                                            </div>
                                          )}
                                          {activeGameTab === 'settings' && (
                                            <div className="row g-2">
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المستوى</div><select value={game.settings?.difficulty || game.difficulty} onChange={(e) => updateGame(game.id, 'settings', { difficulty: e.target.value })} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}><option value="beginner">مبتدئ</option><option value="intermediate">متوسط</option><option value="advanced">متقدم</option></select></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المؤقت</div><div className="form-check"><input type="checkbox" checked={game.settings?.timer || false} onChange={(e) => updateGame(game.id, 'settings', { timer: e.target.checked })} className="form-check-input" id={`timer-${game.id}`} /><label className="form-check-label" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>مفعل</label></div></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>التلميحات</div><div className="form-check"><input type="checkbox" checked={game.settings?.hints ?? true} onChange={(e) => updateGame(game.id, 'settings', { hints: e.target.checked })} className="form-check-input" id={`hints-${game.id}`} /><label className="form-check-label" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>مفعل</label></div></div>
                                              <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المؤثرات الصوتية</div><div className="form-check"><input type="checkbox" checked={game.settings?.soundEffects ?? true} onChange={(e) => updateGame(game.id, 'settings', { soundEffects: e.target.checked })} className="form-check-input" id={`sound-${game.id}`} /><label className="form-check-label" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>مفعل</label></div></div>
                                            </div>
                                          )}
                                          {activeGameTab === 'stats' && (
                                            <div className="row g-2">
                                              <div className="col-6"><div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'var(--surface-elevated)' }}><div className="fs-5 fw-bold" style={{ color: 'var(--primary)' }}>{game.plays.toLocaleString()}</div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>معادة اللعب</div></div></div>
                                              <div className="col-6"><div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'var(--surface-elevated)' }}><div className="fs-5 fw-bold" style={{ color: '#f59e0b' }}>{game.rating || '-'}</div><div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>التقييم</div></div></div>
                                            </div>
                                          )}
                                          <div className="d-flex justify-content-end mt-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                                            <button className="btn btn-sm" style={{ backgroundColor: 'var(--danger)', color: 'white', borderRadius: '6px' }} onClick={() => { if (confirm('حذف هذه اللعبة؟')) { setGames(games.filter(g => g.id !== game.id)); setSelectedGame(null); } }}><FaTrash className="me-1" /> حذف</button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={category.id} className="col-md-6 col-lg-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: category.color + '20' }}>
                        <FaFolder style={{ color: category.color, fontSize: '1.5rem' }} />
                      </div>
                      <div>
                        <h3 className="h6 fw-bold mb-0" style={{ color: 'var(--text)' }}>{category.name}</h3>
                        <span className="badge mt-1" style={{ backgroundColor: category.color + '20', color: category.color, fontSize: '0.75rem' }}>{category.gameCount} لعبة</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>{category.description}</p>
                  <div className="d-flex gap-1">
                    <button className="btn p-2" style={{ backgroundColor: 'var(--surface-elevated)', borderRadius: '8px', color: 'var(--primary)' }}><FaEdit /></button>
                    <button className="btn p-2" style={{ backgroundColor: 'var(--surface-elevated)', borderRadius: '8px', color: 'var(--danger)' }}><FaTrash /></button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="card border-0" style={{ width: '500px', maxWidth: '90%', borderRadius: '20px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 fw-bold" style={{ color: 'var(--text)' }}>{modalType === 'game' ? 'إضافة لعبة جديدة' : 'إضافة فئة جديدة'}</h3>
                  <button onClick={() => setShowModal(false)} className="btn p-2" style={{ borderRadius: '8px' }}><FaTimes /></button>
                </div>
                {modalType === 'game' ? (
                  <div className="d-flex flex-column gap-3">
                    <div><label className="mb-2" style={{ color: 'var(--text)' }}>اسم اللعبة</label><input type="text" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                    <div><label className="mb-2" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} rows={3} /></div>
                    <div className="row g-2">
                      <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>الفئة</label><select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}><option value="">اختر الفئة</option>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div>
                      <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>العمر</label><input type="text" value={newItem.ageRange} onChange={e => setNewItem({ ...newItem, ageRange: e.target.value })} className="form-control" placeholder="مثال: 3-6 سنوات" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                    </div>
                    <div className="row g-2">
                      <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>المستوى</label><select value={newItem.difficulty} onChange={e => setNewItem({ ...newItem, difficulty: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}><option value="beginner">مبتدئ</option><option value="intermediate">متوسط</option><option value="advanced">متقدم</option></select></div>
                      <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>المدة</label><input type="text" value={newItem.duration} onChange={e => setNewItem({ ...newItem, duration: e.target.value })} className="form-control" placeholder="مثال: 10 دقائق" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-check"><input type="checkbox" checked={newItem.isPremium} onChange={e => setNewItem({ ...newItem, isPremium: e.target.checked })} className="form-check-input" id="premium" /><label className="form-check-label" style={{ color: 'var(--text)' }}>لعبة مميزة</label></div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    <div><label className="mb-2" style={{ color: 'var(--text)' }}>اسم الفئة</label><input type="text" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                    <div><label className="mb-2" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} rows={3} /></div>
                    <div><label className="mb-2" style={{ color: 'var(--text)' }}>اللون</label><div className="d-flex gap-2"><input type="color" value={newItem.color} onChange={e => setNewItem({ ...newItem, color: e.target.value })} style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px' }} /></div></div>
                  </div>
                )}
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => setShowModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddItem} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>إضافة</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminGamesPage;