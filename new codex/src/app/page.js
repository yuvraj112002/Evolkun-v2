import HomeSection from "@/components/Home/Home";
import WhyChooseEvolkun from "../components/Home/why-choose-Evolkun";
import Chatbot from "@/components/Chatbot/Chatbot";

export default function Home() {
  
  return (
    <main>
      <HomeSection />
      
      {/* AI Chatbot - Available on all pages */}
      <Chatbot />
    </main>
  );
}