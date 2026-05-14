import WelcomeOnboarding from "@/components/WelcomeOnboarding";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import StudentVoicesReels from "@/components/StudentVoicesReels";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <WelcomeOnboarding />
      <Hero />
      <Partners />
      <Stats />
      <Services />
      <Process />
      <StudentVoicesReels />
      <Testimonials />
      <WhyChooseUs />
      <FAQ />
      <ContactForm />
      <CTA />
    </>
  );
}
