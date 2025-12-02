import { ChevronDown, Bike, MapPin, Clock, Rocket, Smartphone } from "lucide-react";

export function Hero() {
  const scrollToFluxograma = () => {
    const element = document.querySelector("#fluxograma");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* -------- MOBILE (4 ÍCONES GRANDES + VISÍVEIS) -------- */}
        <div className="sm:hidden opacity-80">

          <FloatingIcon
            top="12%"
            left="10%"
            size="14"
            delay="0s"
            icon={<Bike className="w-8 h-8 text-primary" />}
          />

          <FloatingIcon
            top="30%"
            right="10%"
            size="14"
            delay="-1s"
            icon={<MapPin className="w-8 h-8 text-primary" />}
          />

          <FloatingIcon
            bottom="30%"
            left="12%"
            size="13"
            delay="-2s"
            icon={<Clock className="w-7 h-7 text-primary" />}
          />

          <FloatingIcon
            bottom="12%"
            right="25%"
            size="13"
            delay="-1.4s"
            icon={<Rocket className="w-7 h-7 text-primary" />}
          />

          {/* O smartphone fica só no desktop */}
        </div>

        {/* -------- DESKTOP (5 ÍCONES) -------- */}
        <div className="hidden sm:block">

          <FloatingIcon
            top="18%"
            left="15%"
            size="16"
            delay="0s"
            icon={<Bike className="w-8 h-8 text-primary" />}
          />

          <FloatingIcon
            top="28%"
            right="18%"
            size="14"
            delay="-1s"
            icon={<MapPin className="w-7 h-7 text-primary" />}
          />

          <FloatingIcon
            bottom="30%"
            left="20%"
            size="12"
            delay="-2s"
            icon={<Clock className="w-6 h-6 text-primary" />}
          />

          <FloatingIcon
            top="50%"
            right="10%"
            size="14"
            delay="-1.5s"
            icon={<Rocket className="w-7 h-7 text-primary" />}
          />

          <FloatingIcon
            bottom="20%"
            right="25%"
            size="12"
            delay="-0.5s"
            icon={<Smartphone className="w-6 h-6 text-primary" />}
          />

        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center px-4">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-accent-foreground">
              Projeto Acadêmico • Tema 11
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">Bastidores</span>{" "}
            <span className="text-gradient">Digitais</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Engenharia Reversa Conceitual da
          </p>

          <p className="text-2xl md:text-3xl font-bold text-foreground mb-8 max-w-3xl mx-auto">
            Lógica de Atribuição de Entregadores do{" "}
            <span className="text-primary">iFood</span>
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Descubra como o algoritmo do iFood decide qual entregador receberá seu pedido.
            Uma análise completa do fluxo lógico, modelo de dados e impacto psicológico.
          </p>

          {/* CTA */}
          <button
            onClick={scrollToFluxograma}
            className="group inline-flex items-center gap-3 px-8 py-4 ifood-gradient text-primary-foreground font-semibold rounded-2xl shadow-glow hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Explorar o Dossiê
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* Floating Icon Component */
function FloatingIcon({ top, bottom, left, right, translate, size, icon, delay }: any) {
  return (
    <div
      className="absolute animate-bounce-subtle"
      style={{
        top,
        bottom,
        left,
        right,
        transform: translate ? `translateX(${translate})` : undefined,
        animationDelay: delay,
      }}
    >
      <div
        className={`w-${size} h-${size} rounded-2xl bg-card shadow-xl flex items-center justify-center border border-border/50`}
      >
        {icon}
      </div>
    </div>
  );
}
