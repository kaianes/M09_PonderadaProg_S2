Feature: Verificação da exibição dos ganhos dos entregadores

  Scenario: Ganho exibido corretamente
    Given o sistema tem uma lógica de cálculo de ganhos baseada em taxas e entregas realizadas
    When o entregador solicita a exibição dos seus ganhos
    Then o valor exibido deve ser igual ao valor calculado pela lógica do sistema

