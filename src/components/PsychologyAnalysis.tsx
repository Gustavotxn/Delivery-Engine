import { Brain, Zap, Clock, Trophy, Heart, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const triggers = [
  {
    icon: Clock,
    title: "Ansiedade e Urgência",
    color: "from-amber-500 to-orange-500",
    description: "O timer de espera e as atualizações em tempo real criam uma sensação de urgência que mantém o usuário engajado no app.",
    example: "\"Seu pedido está sendo preparado\" → \"João está a caminho\" → \"2 min de distância\"",
    technique: "Recompensa Variável + Progresso Visual",
  },
  {
    icon: Target,
    title: "Transparência Controlada",
    color: "from-blue-500 to-cyan-500",
    description: "Mostrar o mapa em tempo real dá sensação de controle ao cliente, mesmo que ele não possa interferir no processo.",
    example: "O pontinho se movendo no mapa cria a ilusão de participação ativa no processo de entrega.",
    technique: "Ilusão de Controle",
  },
  {
    icon: Trophy,
    title: "Gamificação para Entregadores",
    color: "from-emerald-500 to-green-500",
    description: "O sistema de score e ranking incentiva entregadores a melhorarem seu desempenho para receberem mais pedidos.",
    example: "Entregadores com maior avaliação e tempo online recebem prioridade, criando um ciclo de competição saudável.",
    technique: "Sistema de Recompensa + Competição",
  },
  {
    icon: Zap,
    title: "Gratificação Instantânea",
    color: "from-violet-500 to-purple-500",
    description: "Cada etapa completada gera uma micro-celebração visual, mantendo o usuário emocionalmente investido.",
    example: "Animações de check, notificações push, e feedback sonoro a cada mudança de status.",
    technique: "Micro-momentos de Dopamina",
  },
  {
    icon: Heart,
    title: "Conexão Humanizada",
    color: "from-pink-500 to-rose-500",
    description: "Mostrar foto, nome e avaliação do entregador cria uma conexão emocional e aumenta a empatia do cliente.",
    example: "\"João Pedro ★4.9\" transforma uma entrega anônima em uma interação pessoal.",
    technique: "Humanização do Serviço",
  },
  {
    icon: Brain,
    title: "Redução de Atrito Cognitivo",
    color: "from-slate-500 to-slate-600",
    description: "A automação completa remove decisões do usuário. Ele não escolhe o entregador - o sistema resolve.",
    example: "O algoritmo de atribuição elimina a paralisia de escolha e transfere a responsabilidade para a plataforma.",
    technique: "Design de Escolha Padrão",
  },
];

export function PsychologyAnalysis() {
  return (
    <section id="psicologia" className="py-20 md:py-32 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Análise de Impacto
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O Fator <span className="text-primary">Humano</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Por que a funcionalidade de atribuição funciona tão bem do ponto de vista psicológico?
            Quais gatilhos mentais ela utiliza?
          </p>
        </div>

        {/* Main Analysis */}
        <div className="glass-card p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl ifood-gradient flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">A Engenharia da Experiência</h3>
              <p className="text-muted-foreground leading-relaxed">
                O sistema de atribuição de entregadores do iFood não é apenas uma solução logística - 
                é uma <strong className="text-foreground">obra de engenharia comportamental</strong>. 
                Cada elemento da interface foi projetado para manter todos os participantes (clientes, 
                entregadores e restaurantes) engajados e satisfeitos, mesmo quando enfrentam esperas 
                ou imprevistos.
              </p>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-sm text-foreground">
              <strong>💡 Insight Principal:</strong> O algoritmo otimiza não apenas a eficiência logística, 
              mas também a <em>percepção de eficiência</em>. Um sistema perfeitamente eficiente que parece 
              lento é pior que um sistema menos eficiente que parece rápido.
            </p>
          </div>
        </div>

        {/* Triggers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {triggers.map((trigger, index) => (
            <div
              key={trigger.title}
              className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className={cn("p-4 bg-gradient-to-r text-white", trigger.color)}>
                <div className="flex items-center gap-3">
                  <trigger.icon className="w-6 h-6" />
                  <h4 className="font-bold">{trigger.title}</h4>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {trigger.description}
                </p>

                <div className="p-3 bg-secondary/70 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Exemplo:</p>
                  <p className="text-sm text-foreground italic">"{trigger.example}"</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                    {trigger.technique}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 glass-card p-6 md:p-8 border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-4">📊 Conclusão da Análise</h4>
          <div className="space-y-4 text-muted-foreground">
            <p>
              O sucesso do iFood não está apenas em seu algoritmo de matching eficiente, mas na 
              <strong className="text-foreground"> experiência emocional</strong> que ele proporciona. 
              Cada stakeholder sente que:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <strong className="text-blue-700 dark:text-blue-300 block mb-1">Cliente</strong>
                <span className="text-sm">"Tenho controle e sei exatamente onde está meu pedido"</span>
              </li>
              <li className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">Entregador</strong>
                <span className="text-sm">"Sou recompensado por meu bom desempenho"</span>
              </li>
              <li className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <strong className="text-amber-700 dark:text-amber-300 block mb-1">Restaurante</strong>
                <span className="text-sm">"Posso focar na comida enquanto o app cuida da logística"</span>
              </li>
            </ul>
            <p>
              Este equilíbrio entre <strong className="text-foreground">eficiência real e percebida</strong> é 
              o que torna o sistema tão eficaz e difícil de replicar por concorrentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
