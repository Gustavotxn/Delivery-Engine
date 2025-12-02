import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Flowchart } from "@/components/Flowchart";
import { DataModel } from "@/components/DataModel";
import { InterfaceMockup } from "@/components/InterfaceMockup";
import { PsychologyAnalysis } from "@/components/PsychologyAnalysis";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Bastidores Digitais - Engenharia Reversa do iFood</title>
        <meta 
          name="description" 
          content="Dossiê digital sobre a lógica de atribuição de entregadores do iFood. Projeto acadêmico de engenharia reversa conceitual." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Hero />
          <Flowchart />
          <DataModel />
          <InterfaceMockup />
          <PsychologyAnalysis />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
