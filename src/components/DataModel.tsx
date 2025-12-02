import { Database, ArrowRight, Key, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableField {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  fkRef?: string;
}

interface TableDef {
  name: string;
  description: string;
  fields: TableField[];
  color: string;
}

const tables: TableDef[] = [
  {
    name: "CLIENTE",
    description: "Dados do usuário que realiza o pedido",
    color: "from-blue-500 to-blue-600",
    fields: [
      { name: "id_cliente", type: "INT", isPK: true },
      { name: "nome", type: "VARCHAR(100)" },
      { name: "endereco_atual", type: "VARCHAR(255)" },
      { name: "latitude", type: "DECIMAL(10,8)" },
      { name: "longitude", type: "DECIMAL(11,8)" },
      { name: "telefone", type: "VARCHAR(15)" },
    ],
  },
  {
    name: "RESTAURANTE",
    description: "Estabelecimentos parceiros",
    color: "from-amber-500 to-orange-500",
    fields: [
      { name: "id_restaurante", type: "INT", isPK: true },
      { name: "nome_fantasia", type: "VARCHAR(150)" },
      { name: "endereco", type: "VARCHAR(255)" },
      { name: "latitude", type: "DECIMAL(10,8)" },
      { name: "longitude", type: "DECIMAL(11,8)" },
      { name: "avaliacao_media", type: "DECIMAL(2,1)" },
      { name: "tempo_preparo_medio", type: "INT" },
    ],
  },
  {
    name: "ENTREGADOR",
    description: "Profissionais de entrega cadastrados",
    color: "from-emerald-500 to-green-600",
    fields: [
      { name: "id_entregador", type: "INT", isPK: true },
      { name: "nome", type: "VARCHAR(100)" },
      { name: "veiculo_tipo", type: "ENUM('moto','bike','carro')" },
      { name: "latitude_atual", type: "DECIMAL(10,8)" },
      { name: "longitude_atual", type: "DECIMAL(11,8)" },
      { name: "status", type: "ENUM('online','ocupado','offline')" },
      { name: "avaliacao", type: "DECIMAL(2,1)" },
      { name: "entregas_total", type: "INT" },
      { name: "tempo_online_dia", type: "INT" },
    ],
  },
  {
    name: "PEDIDO",
    description: "Registro de cada pedido realizado",
    color: "from-primary to-primary/80",
    fields: [
      { name: "id_pedido", type: "INT", isPK: true },
      { name: "id_cliente", type: "INT", isFK: true, fkRef: "CLIENTE" },
      { name: "id_restaurante", type: "INT", isFK: true, fkRef: "RESTAURANTE" },
      { name: "id_entregador", type: "INT", isFK: true, fkRef: "ENTREGADOR" },
      { name: "valor_total", type: "DECIMAL(10,2)" },
      { name: "status", type: "ENUM('pendente','preparando','coletado','entregue')" },
      { name: "data_hora_pedido", type: "DATETIME" },
      { name: "data_hora_entrega", type: "DATETIME" },
    ],
  },
  {
    name: "SCORE_ATRIBUICAO",
    description: "Cálculo de pontuação para matching",
    color: "from-violet-500 to-purple-600",
    fields: [
      { name: "id_score", type: "INT", isPK: true },
      { name: "id_pedido", type: "INT", isFK: true, fkRef: "PEDIDO" },
      { name: "id_entregador", type: "INT", isFK: true, fkRef: "ENTREGADOR" },
      { name: "distancia_km", type: "DECIMAL(5,2)" },
      { name: "score_distancia", type: "INT" },
      { name: "score_avaliacao", type: "INT" },
      { name: "score_tempo_online", type: "INT" },
      { name: "score_total", type: "INT" },
    ],
  },
  {
    name: "HISTORICO_NOTIFICACAO",
    description: "Log de notificações enviadas",
    color: "from-slate-500 to-slate-600",
    fields: [
      { name: "id_notificacao", type: "INT", isPK: true },
      { name: "id_pedido", type: "INT", isFK: true, fkRef: "PEDIDO" },
      { name: "id_entregador", type: "INT", isFK: true, fkRef: "ENTREGADOR" },
      { name: "data_hora_envio", type: "DATETIME" },
      { name: "resposta", type: "ENUM('aceito','recusado','timeout')" },
      { name: "tempo_resposta_seg", type: "INT" },
    ],
  },
];

const relationships = [
  { from: "CLIENTE", to: "PEDIDO", label: "1:N", description: "Um cliente faz vários pedidos" },
  { from: "RESTAURANTE", to: "PEDIDO", label: "1:N", description: "Um restaurante recebe vários pedidos" },
  { from: "ENTREGADOR", to: "PEDIDO", label: "1:N", description: "Um entregador realiza vários pedidos" },
  { from: "PEDIDO", to: "SCORE_ATRIBUICAO", label: "1:N", description: "Um pedido gera vários scores" },
  { from: "ENTREGADOR", to: "SCORE_ATRIBUICAO", label: "1:N", description: "Um entregador tem vários scores" },
  { from: "PEDIDO", to: "HISTORICO_NOTIFICACAO", label: "1:N", description: "Um pedido gera várias notificações" },
];

export function DataModel() {
  return (
    <section id="banco-dados" className="py-20 md:py-32 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Modelagem de Banco de Dados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Modelo <span className="text-primary">Entidade-Relacionamento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estrutura conceitual das tabelas necessárias para o funcionamento do sistema de atribuição de entregadores
          </p>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tables.map((table, index) => (
            <div
              key={table.name}
              className="glass-card overflow-hidden animate-slide-up hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Table Header */}
              <div className={cn("p-4 bg-gradient-to-r text-white", table.color)}>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5" />
                  <h3 className="font-bold text-lg">{table.name}</h3>
                </div>
                <p className="text-sm text-white/80 mt-1">{table.description}</p>
              </div>

              {/* Fields */}
              <div className="p-4">
                <div className="space-y-2">
                  {table.fields.map((field) => (
                    <div
                      key={field.name}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-lg text-sm",
                        field.isPK && "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800",
                        field.isFK && "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800",
                        !field.isPK && !field.isFK && "bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {field.isPK && <Key className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                        {field.isFK && <Link2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                        <span className="font-medium text-foreground">{field.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{field.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Relationships */}
        <div className="glass-card p-6 md:p-8">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Relacionamentos entre Entidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relationships.map((rel, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-semibold text-primary">{rel.from}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{rel.to}</span>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                  {rel.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-muted-foreground">Chave Primária (PK)</span>
          </div>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">Chave Estrangeira (FK)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono bg-secondary px-2 py-0.5 rounded">1:N</span>
            <span className="text-sm text-muted-foreground">Um para Muitos</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-12 glass-card p-6 md:p-8 border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-4">📝 Explicação do Modelo</h4>
          <div className="space-y-4 text-muted-foreground">
            <p>
              O modelo foi projetado para suportar especificamente a <strong className="text-foreground">funcionalidade de atribuição de entregadores</strong>. 
              As principais entidades são:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-foreground">CLIENTE, RESTAURANTE e ENTREGADOR</strong>: Entidades principais com dados de localização (latitude/longitude) essenciais para o cálculo de distância.</li>
              <li><strong className="text-foreground">PEDIDO</strong>: Entidade central que conecta todas as outras, registrando cada transação.</li>
              <li><strong className="text-foreground">SCORE_ATRIBUICAO</strong>: Tabela que armazena os cálculos de pontuação de cada entregador para cada pedido, permitindo auditoria e otimização do algoritmo.</li>
              <li><strong className="text-foreground">HISTORICO_NOTIFICACAO</strong>: Log completo de todas as tentativas de atribuição, incluindo aceites, recusas e timeouts.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
