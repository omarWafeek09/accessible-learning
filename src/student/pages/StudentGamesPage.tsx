import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaStar,
  FaGamepad,
  FaSearch,
  FaHeart,
  FaGamepad as FaGamepadIcon,
  FaThLarge,
  FaFont,
  FaCalculator,
  FaPuzzlePiece,
} from "react-icons/fa";
import PageHero from "../layouts/PageHero";
import ui from "../layouts/student-ui.module.css";

const games = [
  { id: 1, title: "محو الحروف", description: "تعلم الحروف بطريقة ممتعة", icon: "🅰️", category: "اللغة", difficulty: "سهل", players: 150, rating: 4.5 },
  { id: 2, title: "الكلمات المتقاطعة", description: "بناء المفردات", icon: "📝", category: "اللغة", difficulty: "صعب", players: 120, rating: 4.6 },
  { id: 3, title: "العد الذهني", description: "تدريب على العمليات الحسابية", icon: "🔢", category: "الرياضيات", difficulty: "متوسط", players: 200, rating: 4.8 },
  { id: 4, title: "مزرعة الأرقام", description: "تعلم الأرقام مع المرح", icon: "🌱", category: "الرياضيات", difficulty: "سهل", players: 90, rating: 4.3 },
  { id: 5, title: "بطاقة الذاكرة", description: "تمرين الذاكرة والتركيز", icon: "🧠", category: "المهارات", difficulty: "سهل", players: 80, rating: 4.2 },
  { id: 6, title: "أحجية اللغز", description: "حل المشاكل المنطقية", icon: "🧩", category: "المهارات", difficulty: "متوسط", players: 60, rating: 4.7 },
];

const tabs = [
  { id: "الكل", label: "الكل", icon: <FaThLarge /> },
  { id: "اللغة", label: "اللغة", icon: <FaFont /> },
  { id: "الرياضيات", label: "الرياضيات", icon: <FaCalculator /> },
  { id: "المهارات", label: "المهارات", icon: <FaPuzzlePiece /> },
];

const StudentGamesPage = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) => {
    const matchesCategory = activeCategory === "الكل" || game.category === activeCategory;
    const matchesSearch = game.title.includes(searchQuery) || game.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const difficultyChip = (d: string) =>
    d === "سهل" ? ui.chipSuccess : d === "متوسط" ? ui.chipWarning : ui.chipDanger;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHero
        icon={<FaGamepadIcon />}
        title="الألعاب التعليمية"
        subtitle="تعلم وأنت تلعب مع ألعاب تعليمية ممتعة، طوّر مهاراتك وحقق إنجازات جديدة كل يوم."
        accent="purple"
      />

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <div className={ui.searchWrap}>
          <FaSearch className={ui.searchIcon} />
          <input
            type="text"
            placeholder="ابحث عن لعبة..."
            className={ui.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={ui.tabsBar} role="tablist" aria-label="تصنيف الألعاب">
        {tabs.map((tab) => {
          const active = activeCategory === tab.id;
          const count = tab.id === "الكل"
            ? games.length
            : games.filter((g) => g.category === tab.id).length;
          return (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveCategory(tab.id)}
              whileTap={{ scale: 0.97 }}
              className={`${ui.tab} ${active ? ui.tabActive : ""}`}
            >
              <span className={ui.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={ui.tabCount}>{count}</span>
            </motion.button>
          );
        })}
      </div>

      {filteredGames.length === 0 ? (
        <div
          className="text-center py-5"
          style={{
            color: "var(--text-light)",
            backgroundColor: "var(--surface)",
            border: "1px dashed var(--border)",
            borderRadius: 18,
          }}
        >
          <p style={{ fontSize: "2.5rem", marginBottom: 8 }}>🔍</p>
          <p style={{ fontWeight: 600 }}>لا توجد نتائج للبحث</p>
          <p style={{ fontSize: "0.85rem" }}>جرّب كلمة أخرى أو غيّر التصنيف</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredGames.map((game, index) => (
            <div key={game.id} className="col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-100"
                style={{
                  backgroundColor: "var(--surface)",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: 130,
                    backgroundColor: "var(--background)",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: "3.5rem" }}>{game.icon}</div>
                  <span
                    className={`${ui.chip} ${difficultyChip(game.difficulty)}`}
                    style={{ position: "absolute", top: 12, insetInlineStart: 12 }}
                  >
                    {game.difficulty}
                  </span>
                </div>

                <div className="p-4" style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  <h3
                    style={{
                      color: "var(--text)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      margin: 0,
                    }}
                  >
                    {game.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {game.description}
                  </p>

                  <div
                    className="d-flex align-items-center gap-3"
                    style={{ color: "var(--text-light)", fontSize: "0.82rem" }}
                  >
                    <span className="d-inline-flex align-items-center gap-1">
                      <FaStar style={{ color: "var(--warning)" }} />
                      {game.rating}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1">
                      <FaGamepad />
                      {game.players.toLocaleString()} لاعب
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                    <button className={ui.btnPrimary} style={{ backgroundColor: "var(--secondary)" }}>
                      <FaPlay size={10} />
                      ابدأ اللعب
                    </button>

                    <button
                      aria-label="إضافة إلى المفضلة"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--surface)",
                        color: "var(--danger)",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StudentGamesPage;
