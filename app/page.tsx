import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import CourseCategories from "@/components/sections/CourseCategories";
import FeaturedCourses from "@/components/sections/FeaturedCourses";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import QuizModal from "@/components/quiz/QuizModal";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <CourseCategories />
        <FeaturedCourses />
        <Testimonials />
        <BlogPreview />
      </main>
      <Footer />
      <QuizModal />
    </>
  );
}
