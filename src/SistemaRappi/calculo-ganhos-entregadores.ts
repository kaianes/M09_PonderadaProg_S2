export class CalculoGanhosEntregadores {
    private taxaBasePorKm: number = 2.5; // Exemplo de taxa base por km
    private fatorDemanda: number = 1.2; // Ajuste baseado na demanda
    private taxaPorEntrega: number = 5; // Exemplo de taxa por pedido entregue
  
    constructor(
      private numEntregadores: number,
      private volumePedidos: number,
      private kilometragemRodada: number
    ) {}
  
    public calcularGanhos(): number {
      // Fator de ajuste (quantidade de entregadores conectados)
      const ajusteEntregadores = this.numEntregadores > 10 ? 0.9 : 1.1;
  
      // Cálculo (distância percorrida e volume de pedidos)
      const ganhoTotal =
        this.kilometragemRodada * this.taxaBasePorKm * ajusteEntregadores +
        this.volumePedidos * this.taxaPorEntrega * this.fatorDemanda;
  
      return parseFloat(ganhoTotal.toFixed(2)); // Retorna valor
    }
  }
  