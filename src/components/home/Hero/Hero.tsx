// src\components\home\Hero\Hero.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaPlay,
  FaStar,
  FaUsers,
  FaBookOpen,
  FaCheck,
  FaAward,
} from "react-icons/fa";
import Button from "../../ui/Button";
import { useTheme } from "../../../context/ThemeContext";
import heroImage from "../../../assets/hero.png";

const typingTexts = [
  "تعليم بلا عقبات",
  "تعلم للجميع",
  "مستقبل واعد",
  "إمكانيات لا تنتهي",
];

const stats = [
  { icon: <FaUsers />, number: "12,500+", label: "طالب نشط" },
  { icon: <FaBookOpen />, number: "200+", label: "دورة تعليمية" },
  { icon: <FaStar />, number: "4.9", label: "تقييم المستخدمين" },
];

const Hero = () => {
  const { theme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = typingTexts[currentTextIndex];

    if (isTyping) {
      const timeout = setTimeout(() => {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          setIsTyping(true);
        }
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, currentTextIndex]);

  return (
    <section
      id="home"
      className="min-vh-100 d-flex align-items-center position-relative overflow-hidden"
      style={{
        paddingTop: "80px",
        paddingBottom: "40px",
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #12121f 0%, #1e1e32 50%, #1a1a2e 100%)"
            : "linear-gradient(135deg, #f7f7f7 0%, #fff 50%, #f0f9f0 100%)",
      }}
      aria-labelledby="hero-title"
    >
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="badge px-4 py-2 mb-4 d-inline-flex align-items-center gap-2"
                style={{
                  backgroundColor: "rgba(88, 204, 2, 0.15)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderRadius: "50px",
                }}
              >
                <FaAward /> منصة التعليم الشامل
              </span>

              <h1
                id="hero-title"
                className="display-2 fw-bold mb-4 lh-base"
                style={{ color: "var(--text)", lineHeight: 1.2 }}
              >
                تعليم{" "}
                <span
                  style={{
                    color: "var(--primary)",
                    borderRight: "4px solid var(--primary)",
                    paddingRight: "12px",
                  }}
                >
                  {displayText}
                  <span className="opacity-50">|</span>
                </span>
              </h1>

              <p
                className="lead mb-4"
                style={{
                  color: "var(--text-light)",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
              >
                تمكين المتعلمين من جميع القدرات بتجارب تعليمية شاملة ومخصصة.
                مصمم لإطلاق إمكانات كل طفل من خلال تقنيات مبتكرة و أساليب
                تعليمية متخصصة.
              </p>

              <div className="d-flex gap-3 flex-wrap mb-5">
                <Button variant="primary" size="large">
                  ابدأ رحلتك مجاناً
                </Button>
                <Button variant="secondary" size="large">
                  <FaPlay className="me-2" style={{ fontSize: "0.8rem" }} />
                  شاهد الفيديو
                </Button>
              </div>

              <div className="d-flex gap-4 flex-wrap">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="d-flex align-items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "rgba(88, 204, 2, 0.1)",
                        color: "var(--primary)",
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        className="fw-bold"
                        style={{ color: "var(--text)", fontSize: "1.1rem" }}
                      >
                        {stat.number}
                      </div>
                      <div
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="position-relative"
            >
              <div
                className="rounded-4 overflow-hidden position-relative"
                style={{
                  background: "var(--surface)",
                  minHeight: "550px",
                  aspectRatio: "16/10",
                }}
              >
                <img
                  src={heroImage}
                  alt="تعليم شامل للجميع"
                  width="700"
                  height="438"
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    minHeight: "550px",
                  }}
                />

                <motion.div
                  className="position-absolute rounded-3 p-3 shadow-lg"
                  style={{
                    bottom: "30px",
                    left: "30px",
                    maxWidth: "220px",
                    backgroundColor: "var(--surface-elevated)",
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(88, 204, 2, 0.2)",
                        color: "var(--primary)",
                      }}
                    >
                      <FaCheck />
                    </div>
                    <div>
                      <div
                        className="fw-bold"
                        style={{ color: "var(--text)", fontSize: "1rem" }}
                      >
                        تعلم ممتع
                      </div>
                      <div
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.8rem",
                        }}
                      >
                        92% معدل إتمام
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="position-absolute rounded-3 p-3 shadow-lg"
                  style={{
                    top: "40px",
                    right: "30px",
                    maxWidth: "200px",
                    backgroundColor: "var(--surface-elevated)",
                  }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "var(--secondary)",
                      }}
                    >
                      ⭐
                    </div>
                    <div>
                      <div
                        className="fw-bold"
                        style={{ color: "var(--text)", fontSize: "1rem" }}
                      >
                        4.9 تقييم
                      </div>
                      <div
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.8rem",
                        }}
                      >
                        +2,500 مراجعة
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div
                  className="position-absolute rounded-pill px-4 py-2 text-white fw-bold d-flex align-items-center gap-2"
                  style={{
                    bottom: "30px",
                    right: "30px",
                    backgroundColor: "var(--primary)",
                    fontSize: "0.9rem",
                  }}
                >
                 l تعليم شامل
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="me-2" style={{ color: "var(--text-light)" }}>
            مرر للأسفل
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowDown
              style={{ color: "var(--primary)", fontSize: "1.5rem" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
