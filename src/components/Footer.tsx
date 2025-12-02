import { Heart, Github, ExternalLink } from "lucide-react";

const footerLinks = [
  { label: "Fluxograma", href: "#fluxograma" },
  { label: "Banco de Dados", href: "#banco-dados" },
  { label: "Interface", href: "#interface" },
  { label: "Psicologia", href: "#psicologia" },
  { label: "Equipe", href: "#equipe" },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl ifood-gradient flex items-center justify-center">
                <span className="text-white font-extrabold text-lg">iF</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-background leading-tight">Bastidores</span>
                <span className="text-xs text-primary font-semibold -mt-0.5">Digitais</span>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Dossiê de engenharia reversa conceitual sobre a lógica de atribuição de entregadores do iFood.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-4">Navegação Rápida</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="font-bold text-background mb-4">Sobre o Projeto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full ifood-gradient text-white text-xs font-semibold">
                  Tema 11
                </span>
                <span className="text-sm text-background/60">iFood - Atribuição de Entregadores</span>
              </div>
              <p className="text-sm text-background/60">
                Projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.
              </p>
              <p className="text-sm text-background/40">
                1º Ano • 2024
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Credits */}
            <p className="text-sm text-background/60 flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> por 
              <span className="text-background font-medium">Gabriel, Murilo e Gustavo</span>
            </p>

            {/* Disclaimer */}
            <p className="text-xs text-background/40 text-center md:text-right max-w-md">
              Projeto educacional sem afiliação oficial com iFood®. 
              Todas as marcas pertencem aos seus respectivos proprietários.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
