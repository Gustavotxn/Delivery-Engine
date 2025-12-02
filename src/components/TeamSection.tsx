import { Github, Linkedin, Code, Database, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Gabriel Perugorria",
    role: "Lógica & Fluxogramas",
    avatar: "public/imagens/nevesterno.jpg",
    color: "from-red-600 to-orange-500",
    skills: ["Lógica de Programação", "Algoritmos", "Documentação"],
    icon: Code,
    bio: "Responsável pela modelagem do fluxograma de decisão e análise lógica do sistema de atribuição de entregadores.",
  },
  {
    name: "Murilo Abreu",
    role: "Banco de Dados & Backend",
    avatar: "public//imagens/abreu.jpg",
    color: "from-red-600 to-orange-500",
    skills: ["Modelagem de Dados", "SQL", "DER"],
    icon: Database,
    bio: "Especialista em modelagem conceitual do banco de dados e estruturação das entidades e relacionamentos.",
  },
  {
    name: "Gustavo Teixeira",
    role: "Interface & Design",
    avatar: "public//imagens/castrin.jpg",
   color: "from-red-600 to-orange-500",
    skills: ["UI/UX", "Mockups", "Front-end"],
    icon: Palette,
    bio: "Criador dos mockups de interface e análise visual de onde os dados do banco aparecem para o usuário final.",
  },
];

export function TeamSection() {
  return (
    <section id="equipe" className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Os Investigadores
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nossa <span className="text-primary">Equipe</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Os responsáveis pela engenharia reversa conceitual deste projeto
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Avatar Section */}
              <div className={cn("p-8 bg-gradient-to-br text-white text-center", member.color)}>
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur mx-auto flex items-center justify-center mb-4 ring-4 ring-white/30 overflow-hidden">
  {member.avatar.includes(".") ? (
    <img
      src={member.avatar}
      alt={member.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-3xl font-bold">{member.avatar}</span>
  )}
</div>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-2 text-white/80">
                  <member.icon className="w-4 h-4" />
                  <span className="text-sm">{member.role}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links (Placeholder) */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="mt-16 glass-card p-6 md:p-8 text-center">
          <h4 className="font-bold text-xl mb-4">Sobre o Projeto</h4>
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
            <p>
              Este dossiê foi desenvolvido como parte do projeto acadêmico 
              <strong className="text-foreground"> "Bastidores Digitais"</strong>, 
              que propõe a engenharia reversa conceitual de funcionalidades famosas do mercado.
            </p>
            <p>
              O objetivo foi aplicar conhecimentos de <strong className="text-foreground">Lógica de Programação</strong>, 
              <strong className="text-foreground"> Banco de Dados</strong>, <strong className="text-foreground">Computação Gráfica</strong> e 
              <strong className="text-foreground"> Psicologia</strong> para desvendar o funcionamento interno 
              do sistema de atribuição de entregadores do iFood.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                Tema 11 - iFood
              </span>
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full">
                2º Módulo - 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
