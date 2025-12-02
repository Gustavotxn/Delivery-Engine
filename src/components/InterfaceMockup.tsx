import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  MessageCircle, 
  Navigation, 
  CheckCircle2,
  Bike,
  Store,
  User,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockupViews = [
  {
    id: "cliente",
    label: "Visão do Cliente",
    icon: User,
  },
  {
    id: "entregador",
    label: "Visão do Entregador",
    icon: Bike,
  },
  {
    id: "restaurante",
    label: "Visão do Restaurante",
    icon: Store,
  },
];

interface AnnotationProps {
  children: React.ReactNode;
  label: string;
  table: string;
  field: string;
  position: "top" | "bottom" | "left" | "right";
}

function Annotation({ children, label, table, field, position }: AnnotationProps) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative z-10 transition-all duration-200",
        isHovered && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded"
      )}>
        {children}
      </div>
      {isHovered && (
        <div className={cn(
          "absolute z-20 w-48 p-3 bg-foreground text-background rounded-lg shadow-xl text-xs animate-fade-in",
          positionClasses[position]
        )}>
          <p className="font-bold mb-1">{label}</p>
          <p className="opacity-80">
            Tabela: <span className="font-mono text-primary-foreground bg-primary/20 px-1 rounded">{table}</span>
          </p>
          <p className="opacity-80">
            Campo: <span className="font-mono text-primary-foreground bg-primary/20 px-1 rounded">{field}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function InterfaceMockup() {
  const [activeView, setActiveView] = useState("cliente");

  return (
    <section id="interface" className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Computação Gráfica
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Raio-X da <span className="text-primary">Interface</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mockups anotados mostrando onde cada informação do banco de dados aparece para o usuário
          </p>
          <p className="text-sm text-primary mt-2">
            💡 Passe o mouse sobre os elementos para ver as anotações técnicas
          </p>
        </div>

        {/* View Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-secondary rounded-2xl p-1.5 gap-1">
            {mockupViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                  activeView === view.id
                    ? "ifood-gradient text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <view.icon className="w-4 h-4" />
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mockup Container */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Phone Frame */}
            <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl z-10" />
              
              {/* Screen */}
              <div className="relative bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                {/* Status Bar */}
                <div className="h-12 px-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 bg-muted-foreground rounded-sm" />
                  </div>
                </div>

                {/* Client View */}
                {activeView === "cliente" && (
                  <div className="px-4 pb-4 space-y-4 animate-fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Entrega em</p>
                        <Annotation label="Endereço do Cliente" table="CLIENTE" field="endereco_atual" position="bottom">
                          <p className="font-bold text-foreground text-sm">Rua das Flores, 123</p>
                        </Annotation>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* Map Preview */}
                    <div className="relative h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                          <div className="w-3 h-3 bg-primary rounded-full relative z-10" />
                        </div>
                      </div>
                      <Annotation label="Localização em Tempo Real" table="ENTREGADOR" field="latitude_atual, longitude_atual" position="bottom">
                        <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-medium">
                          <Bike className="w-3 h-3 inline mr-1 text-primary" />
                          2 min de distância
                        </div>
                      </Annotation>
                    </div>

                    {/* Order Status */}
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                          <Package className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <Annotation label="Status do Pedido" table="PEDIDO" field="status" position="right">
                            <p className="font-bold text-foreground text-sm">A caminho</p>
                          </Annotation>
                          <Annotation label="Horário do Pedido" table="PEDIDO" field="data_hora_pedido" position="right">
                            <p className="text-xs text-muted-foreground">Pedido às 19:32</p>
                          </Annotation>
                        </div>
                        <Annotation label="Tempo de Preparo" table="RESTAURANTE" field="tempo_preparo_medio" position="left">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>~15 min</span>
                          </div>
                        </Annotation>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <div className="flex-1 h-1 bg-emerald-500 rounded" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <div className="flex-1 h-1 bg-emerald-500 rounded" />
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        <div className="flex-1 h-1 bg-border rounded" />
                        <div className="w-3 h-3 rounded-full bg-border" />
                      </div>
                    </div>

                    {/* Delivery Person */}
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                          JP
                        </div>
                        <div className="flex-1">
                          <Annotation label="Nome do Entregador" table="ENTREGADOR" field="nome" position="top">
                            <p className="font-bold text-foreground">João Pedro</p>
                          </Annotation>
                          <div className="flex items-center gap-2">
                            <Annotation label="Avaliação" table="ENTREGADOR" field="avaliacao" position="bottom">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-medium text-foreground">4.9</span>
                              </div>
                            </Annotation>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Annotation label="Tipo de Veículo" table="ENTREGADOR" field="veiculo_tipo" position="bottom">
                              <span className="text-xs text-muted-foreground">Moto</span>
                            </Annotation>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <Phone className="w-4 h-4 text-foreground" />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Entregador View */}
                {activeView === "entregador" && (
                  <div className="px-4 pb-4 space-y-4 animate-fade-in">
                    {/* New Order Alert */}
                    <div className="ifood-gradient rounded-2xl p-4 text-primary-foreground">
                      <p className="text-xs opacity-80 mb-1">Novo pedido disponível!</p>
                      <div className="flex items-center justify-between">
                        <Annotation label="Valor do Pedido" table="PEDIDO" field="valor_total" position="bottom">
                          <p className="text-2xl font-bold">R$ 8,50</p>
                        </Annotation>
                        <Annotation label="Distância Calculada" table="SCORE_ATRIBUICAO" field="distancia_km" position="bottom">
                          <div className="text-right">
                            <p className="text-sm opacity-80">Distância total</p>
                            <p className="font-bold">3,2 km</p>
                          </div>
                        </Annotation>
                      </div>
                    </div>

                    {/* Route Info */}
                    <div className="glass-card p-4 space-y-4">
                      {/* Restaurant */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                          <Store className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Coletar em</p>
                          <Annotation label="Nome do Restaurante" table="RESTAURANTE" field="nome_fantasia" position="right">
                            <p className="font-bold text-foreground text-sm">Burger House</p>
                          </Annotation>
                          <Annotation label="Endereço do Restaurante" table="RESTAURANTE" field="endereco" position="right">
                            <p className="text-xs text-muted-foreground">Av. Principal, 500</p>
                          </Annotation>
                        </div>
                        <span className="text-xs text-muted-foreground">1,2 km</span>
                      </div>

                      <div className="border-l-2 border-dashed border-border ml-4 h-4" />

                      {/* Client */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Entregar em</p>
                          <Annotation label="Nome do Cliente" table="CLIENTE" field="nome" position="right">
                            <p className="font-bold text-foreground text-sm">Maria Silva</p>
                          </Annotation>
                          <Annotation label="Endereço de Entrega" table="CLIENTE" field="endereco_atual" position="right">
                            <p className="text-xs text-muted-foreground">Rua das Flores, 123</p>
                          </Annotation>
                        </div>
                        <span className="text-xs text-muted-foreground">2,0 km</span>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-2 py-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <Annotation label="Timeout de Resposta" table="HISTORICO_NOTIFICACAO" field="tempo_resposta_seg" position="top">
                        <span className="text-lg font-bold text-foreground">00:45</span>
                      </Annotation>
                      <span className="text-sm text-muted-foreground">para aceitar</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm">
                        Recusar
                      </button>
                      <button className="py-3 rounded-xl ifood-gradient text-primary-foreground font-semibold text-sm shadow-glow-sm">
                        Aceitar
                      </button>
                    </div>
                  </div>
                )}

                {/* Restaurant View */}
                {activeView === "restaurante" && (
                  <div className="px-4 pb-4 space-y-4 animate-fade-in">
                    {/* Header Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-xs text-muted-foreground">Pedidos Hoje</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-3 text-center">
                        <Annotation label="Avaliação Média" table="RESTAURANTE" field="avaliacao_media" position="bottom">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <span className="text-2xl font-bold text-foreground">4.7</span>
                          </div>
                        </Annotation>
                        <p className="text-xs text-muted-foreground">Avaliação</p>
                      </div>
                    </div>

                    {/* Active Order */}
                    <div className="glass-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Annotation label="ID do Pedido" table="PEDIDO" field="id_pedido" position="right">
                          <span className="font-bold text-foreground">#2847</span>
                        </Annotation>
                        <Annotation label="Status do Pedido" table="PEDIDO" field="status" position="left">
                          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-lg">
                            Preparando
                          </span>
                        </Annotation>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">2x Hambúrguer Clássico</span>
                          <span className="text-foreground">R$ 45,80</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">1x Batata Grande</span>
                          <span className="text-foreground">R$ 15,90</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <Bike className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                            <Annotation label="Entregador Atribuído" table="ENTREGADOR" field="nome" position="top">
                              <p className="font-medium text-foreground text-sm">João Pedro</p>
                            </Annotation>
                            <Annotation label="Status do Entregador" table="ENTREGADOR" field="status" position="bottom">
                              <p className="text-xs text-emerald-600">A caminho da coleta</p>
                            </Annotation>
                          </div>
                          <Annotation label="Tempo Estimado" table="SCORE_ATRIBUICAO" field="distancia_km" position="left">
                            <span className="text-xs text-muted-foreground">~5 min</span>
                          </Annotation>
                        </div>
                      </div>
                    </div>

                    {/* Ready Button */}
                    <button className="w-full py-3 rounded-xl ifood-gradient text-primary-foreground font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Marcar como Pronto
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Os elementos destacados mostram a conexão direta entre a interface do usuário e o banco de dados.
            <br />
            <span className="text-primary font-medium">Passe o mouse</span> sobre qualquer elemento para ver qual tabela e campo alimentam aquela informação.
          </p>
        </div>
      </div>
    </section>
  );
}
