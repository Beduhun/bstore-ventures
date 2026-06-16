import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import CourseCategories from "@/components/sections/CourseCategories";
import QuizSection from "@/components/sections/QuizSection";
import FeaturedCourses from "@/components/sections/FeaturedCourses";
import BlogPreview from "@/components/sections/BlogPreview";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <CourseCategories />
        <QuizSection />
        <FeaturedCourses />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
