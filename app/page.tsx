import WelcomeOnboarding from "@/components/WelcomeOnboarding";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import NewsUpdates from "@/components/NewsUpdates";
import Process from "@/components/Process";
import StudentVoicesReels from "@/components/StudentVoicesReels";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <WelcomeOnboarding />
      <Hero />
      <Services />
      <NewsUpdates />
      <Process />
      <StudentVoicesReels />
      <WhyChooseUs />
      <FAQ />
      <ContactForm />
      <CTA />
    </>
  );
}
