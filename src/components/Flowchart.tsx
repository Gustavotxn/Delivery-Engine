import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Package, MapPin, Users, Calculator, TrendingUp, Bell, CheckCircle2, Search, UserCheck, ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStep {
  id: number;
  type: "start" | "process" | "decision" | "end";
  title: string;
  subtitle: string;
  icon: any;
  yesTo?: number;
  noTo?: number;
  nextTo?: number;
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    type: "start",
    title: "Pedido Confirmado",
    subtitle: "Cliente finaliza compra no app",
    icon: Package,
    nextTo: 2,
  },
  {
    id: 2,
    type: "process",
    title: "Coleta de Informações",
    subtitle: "Localização, restaurante e detalhes do pedido",
    icon: MapPin,
    nextTo: 3,
  },
  {
    id: 3,
    type: "process",
    title: "Busca Inteligente",
    subtitle: "Identifica entregadores próximos ao restaurante",
    icon: Users,
    nextTo: 4,
  },
  {
    id: 4,
    type: "decision",
    title: "Entregadores Disponíveis?",
    subtitle: "Verifica se há profissionais na região",
    icon: Search,
    yesTo: 5,
    noTo: 10,
  },
  {
    id: 5,
    type: "process",
    title: "Análise de Score",
    subtitle: "Avalia distância, avaliação e histórico",
    icon: Calculator,
    nextTo: 6,
  },
  {
    id: 6,
    type: "process",
    title: "Criação de Ranking",
    subtitle: "Ordena entregadores por melhor pontuação",
    icon: TrendingUp,
    nextTo: 7,
  },
  {
    id: 7,
    type: "process",
    title: "Envio de Oferta",
    subtitle: "Notifica o entregador com maior score",
    icon: Bell,
    nextTo: 8,
  },
  {
    id: 8,
    type: "decision",
    title: "Entregador Aceitou?",
    subtitle: "Aguarda confirmação em até 60 segundos",
    icon: UserCheck,
    yesTo: 9,
    noTo: 11,
  },
  {
    id: 9,
    type: "end",
    title: "Match Confirmado",
    subtitle: "Pedido atribuído com sucesso!",
    icon: CheckCircle2,
  },
  {
    id: 10,
    type: "process",
    title: "Expandir Busca",
    subtitle: "Aumenta raio em +2km",
    icon: Search,
    nextTo: 4,
  },
  {
    id: 11,
    type: "decision",
    title: "Próximo Disponível?",
    subtitle: "Verifica restantes no ranking",
    icon: Users,
    yesTo: 12,
    noTo: 10,
  },
  {
    id: 12,
    type: "process",
    title: "Próximo da Fila",
    subtitle: "Seleciona segundo melhor score",
    icon: UserCheck,
    nextTo: 7,
  },
];

export function Flowchart() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [speed, setSpeed] = useState(1800);
  const [path, setPath] = useState<number[]>([1]);

  const getNextStep = useCallback((step: FlowStep): number | null => {
    if (step.type === "end") return null;
    if (step.type === "decision") {
      const decisions: Record<number, boolean> = {
        4: true,
        8: Math.random() > 0.3,
        11: true,
      };
      return decisions[step.id] ? step.yesTo! : step.noTo!;
    }
    return step.nextTo || null;
  }, []);

  const advanceStep = useCallback(() => {
    const currentFlowStep = flowSteps.find((s) => s.id === path[path.length - 1]);
    if (!currentFlowStep) return;

    const nextStepId = getNextStep(currentFlowStep);
    if (nextStepId) {
      setPath((prev) => [...prev, nextStepId]);
      setCompletedSteps((prev) => [...prev, currentFlowStep.id]);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      setCompletedSteps((prev) => [...prev, currentFlowStep.id]);
    }
  }, [path, getNextStep]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(advanceStep, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, path, advanceStep, speed]);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCompletedSteps([]);
    setPath([1]);
  };

  const activeStepId = path[path.length - 1];
  const activeStep = flowSteps.find((s) => s.id === activeStepId);

  const renderStep = (step: FlowStep, showArrow = true) => {
    const isActive = step.id === activeStepId;
    const isCompleted = completedSteps.includes(step.id);
    const isInPath = path.includes(step.id);
    const Icon = step.icon;

    return (
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative w-full max-w-md transition-all duration-700",
            !isInPath && "opacity-20 scale-95",
            isActive && "scale-105"
          )}
        >
          {step.type === "decision" ? (
            // Decision Diamond
            <div className="relative">
              <div
                className={cn(
                  "p-8 md:p-10 rounded-3xl border-2 transition-all duration-500",
                  "bg-gradient-to-br",
                  isActive
                    ? "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-400 shadow-2xl shadow-amber-500/20"
                    : isInPath
                    ? "from-amber-50/50 to-amber-100/50 dark:from-amber-950/10 dark:to-amber-900/10 border-amber-300 dark:border-amber-800"
                    : "from-gray-50 to-gray-100 dark:from-muted/50 dark:to-muted border-gray-200 dark:border-border"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                      isActive
                        ? "bg-amber-500 text-white shadow-lg"
                        : isInPath
                        ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
                        : "bg-gray-200 dark:bg-muted text-gray-400"
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-200/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
                      DECISÃO
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.subtitle}</p>
                    
                    {isActive && (
                      <div className="mt-4 flex gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          Sim
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-400 text-sm font-semibold">
                          <X className="w-4 h-4" />
                          Não
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl opacity-20 blur-xl -z-10 animate-pulse" />
              )}
            </div>
          ) : (
            // Process/Start/End Card
            <div className="relative">
              <div
                className={cn(
                  "p-8 md:p-10 rounded-3xl border-2 transition-all duration-500",
                  "bg-gradient-to-br",
                  step.type === "start" &&
                    "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-400",
                  step.type === "end" &&
                    "from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 border-rose-400",
                  step.type === "process" &&
                    isActive &&
                    "from-primary/5 to-primary/10 border-primary shadow-2xl shadow-primary/20",
                  step.type === "process" &&
                    !isActive &&
                    isInPath &&
                    "from-white to-gray-50 dark:from-card dark:to-muted/50 border-gray-200 dark:border-border",
                  step.type === "process" &&
                    !isActive &&
                    !isInPath &&
                    "from-gray-50 to-gray-100 dark:from-muted/50 dark:to-muted border-gray-200 dark:border-border"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                      step.type === "start" && "bg-emerald-500 text-white shadow-lg",
                      step.type === "end" && "bg-rose-500 text-white shadow-lg",
                      step.type === "process" &&
                        isActive &&
                        "bg-primary text-white shadow-lg",
                      step.type === "process" &&
                        !isActive &&
                        isInPath &&
                        "bg-primary/10 text-primary",
                      step.type === "process" &&
                        !isActive &&
                        !isInPath &&
                        "bg-gray-200 dark:bg-muted text-gray-400"
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-bold mb-2",
                        step.type === "start" &&
                          "bg-emerald-200/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                        step.type === "end" &&
                          "bg-rose-200/50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
                        step.type === "process" &&
                          "bg-primary/10 text-primary"
                      )}
                    >
                      {step.type === "start" ? "INÍCIO" : step.type === "end" ? "FIM" : "PROCESSO"}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.subtitle}</p>
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-3xl opacity-20 blur-xl -z-10 animate-pulse" />
              )}
            </div>
          )}
        </div>

        {/* Arrow Connector */}
        {showArrow && (
          <div className="my-4 flex items-center justify-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500",
                isInPath
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 dark:bg-muted text-gray-300 dark:text-muted-foreground"
              )}
            >
              <ArrowDown
                className={cn("w-5 h-5 transition-all", isInPath && "animate-bounce")}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-6 md:py-10 min-h-screen">
      <div className="section-container max-w-3xl">
        {/* Header com Controls */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Sistema de Atribuição Inteligente</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                isPlaying
                  ? "bg-muted text-foreground hover:bg-muted/80"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
              )}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Iniciar Simulação</span>
                </>
              )}
            </button>

            <button
              onClick={reset}
              className="px-4 py-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-all"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="h-8 w-px bg-border" />

            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-4 py-3 rounded-xl bg-muted text-foreground text-sm font-medium border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value={2500}>🐢 Lento</option>
              <option value={1800}>⚡ Normal</option>
              <option value={1000}>🚀 Rápido</option>
            </select>

            <div className="px-4 py-3 rounded-xl bg-primary/10 text-primary text-sm font-bold">
              Etapa {currentStep + 1} de {flowSteps.length}
            </div>
          </div>
        </div>

        {/* Main Flow */}
        <div className="space-y-0">
          {renderStep(flowSteps[0])}
          {renderStep(flowSteps[1])}
          {renderStep(flowSteps[2])}
          {renderStep(flowSteps[3])}

          {/* Decision Branch */}
          <div className="grid md:grid-cols-2 gap-6 my-4">
            <div>{renderStep(flowSteps[9], false)}</div>
            <div>{renderStep(flowSteps[4], false)}</div>
          </div>

          <div className="flex justify-center my-4">
            <ArrowDown className="w-5 h-5 text-primary" />
          </div>

          {renderStep(flowSteps[5])}
          {renderStep(flowSteps[6])}

          {/* Loop Branch */}
          <div className="grid md:grid-cols-2 gap-6 my-4">
            <div>{renderStep(flowSteps[11], false)}</div>
            <div>{renderStep(flowSteps[7], false)}</div>
          </div>

          <div className="flex justify-center my-4">
            <ArrowDown className="w-5 h-5 text-primary" />
          </div>

          {renderStep(flowSteps[10], false)}
          {renderStep(flowSteps[8], false)}
        </div>

        {/* Active Step Highlight */}
        {activeStep && (
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">#{activeStep.id}</span>
              </div>
              <h4 className="font-bold text-lg text-foreground">{activeStep.title}</h4>
            </div>
            <p className="text-muted-foreground">{activeStep.subtitle}</p>
          </div>
        )}
      </div>
    </section>
  );
}
