// src\App.tsx
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/home/Hero/Hero";
import Features from "./components/home/Features/Features";
import RecommendedCourses from "./components/home/courses/RecommendedCourses";
import Categories from "./components/home/Categories/Categories";
import GamesShowcase from "./components/home/Games/GamesShowcase";
import DisabilityTypes from "./components/home/Features/DisabilityTypes";
import Reviews from "./components/home/Reviews/Reviews";
import Community from "./components/home/Community/Community";
import Subscription from "./components/home/Subscription/Subscription";
import Contact from "./components/home/Contact/Contact";
import QA from "./components/home/QA/QA";
import Footer from "./components/layout/Footer/Footer";
import Chatbot from "./components/ui/Chatbot";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const GameDetailsPage = lazy(() => import("./pages/GameDetailsPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard"));
const SupportDashboard = lazy(() => import("./pages/SupportDashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">جاري التحميل...</span>
    </div>
  </div>
);

function App() {
  const path = window.location.pathname;

  if (path === "/auth") {
    return (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    );
  }

  if (path.startsWith("/game")) {
    const gameId = path.split("/")[2] || "1";
    return (
      <Suspense fallback={<PageLoader />}>
        <GameDetailsPage gameId={gameId} />
      </Suspense>
    );
  }

  if (path === "/community") {
    return (
      <Suspense fallback={<PageLoader />}>
        <CommunityPage />
      </Suspense>
    );
  }

  if (path.startsWith("/admin")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  if (path.startsWith("/instructor")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <InstructorDashboard />
      </Suspense>
    );
  }

  if (path.startsWith("/support")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <SupportDashboard />
      </Suspense>
    );
  }

  if (path.startsWith("/student")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <StudentDashboard />
      </Suspense>
    );
  }

  return (
    <>
      <a href="#main-content" className="sr-only">
        تخطي إلى المحتوى الرئيسي
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <RecommendedCourses />
        <Categories />
        <GamesShowcase />
        <DisabilityTypes />
        <Reviews />
        <Community />
        <Subscription />
        <QA />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
