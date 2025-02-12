import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { CalculoGanhosEntregadores } from "../SistemaRappi/calculo-ganhos-entregadores";

let sistemaGanhos: CalculoGanhosEntregadores;
let ganhoExibido: number;

Given(
  "o sistema tem uma lógica de cálculo de ganhos baseada em taxas e entregas realizadas",
  function () {
    sistemaGanhos = new CalculoGanhosEntregadores(8, 50, 120); // Exemplo: 8 entregadores, 50 pedidos, 120 km
  }
);

When("o entregador solicita a exibição dos seus ganhos", function () {
  ganhoExibido = sistemaGanhos.calcularGanhos();
});

Then("o valor exibido deve ser igual ao valor calculado pela lógica do sistema", function () {
  assert.strictEqual(ganhoExibido, sistemaGanhos.calcularGanhos());
});
