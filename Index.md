# Ponderada de Programação

Módulo 09 - Semana 01

## Transformação de Regras de Negócio em Código e Verificação de Qualidade

Kaiane Souza Cordeiro - Engenharia de Software (turma 09)

&emsp;&emsp;Nesta atividade, vou transformar as necessidades do negócio em código e validar as regras através de testes. Começarei criando um mapa dos *business drivers*, identificando problemas e suas soluções. Em seguida, vou definir uma estratégia de testes utilizando ferramentas como Cucumber com Gherkin para testar as regras de negócio e JMeter para avaliar a performance do sistema. Por fim, farei a análise dos códigos e dos resultados dos testes para garantir que as regras estão sendo seguidas e que a qualidade do sistema está sendo mantida.

## 1. Mapa dos Business Drivers

O mapa dos *business drivers* é uma ferramenta que conecta as necessidades e desafios do negócio com as regras de negócio que devem ser implementadas no sistema. Ele ajuda a identificar as dores ou erros que impactam o desempenho ou a experiência do usuário e, a partir disso, cria soluções por meio da definição de regras claras.

Aqui está a tabela com alguns exemplos de como mapear os drivers:

| Dores e Erros                              | Regra de Negócio (Definição)                                     | Indicador de Conformidade                         | Direcionador (foco)                                                                 |
|--------------------------------------------|------------------------------------------------------------------|--------------------------------------------------|------------------------------------------------------------------------------------|
| **Erros na exibição dos ganhos dos entregadores** | O valor exibido deve ser igual ao valor calculado                 | Diferença < 0.5% entre UI e cálculo real         | Assegurar transparência nos ganhos dos entregadores, reduzindo solicitações de suporte e aumentando a confiança na plataforma. |
| **Lentidão em algumas telas/etapas**       | O tempo de resposta deve ser aceitável                            | Tempo de carregamento < 2s                        | Melhorar a performance das telas para otimizar a experiência do usuário e reduzir a taxa de abandono. |


### 1.1 Erros na Exibição dos Ganhos dos Entregadores

**O que é?**  
Este problema ocorre quando os valores exibidos para os entregadores, que mostram os ganhos após a realização das entregas, não coincidem com os cálculos reais realizados pelo sistema. Isso pode gerar confusão entre os entregadores, que podem se sentir desmotivados ao perceberem que o valor mostrado não corresponde ao que de fato foi calculado e devido.

**O que pode ser a causa?**  
- Falhas na lógica de cálculo que gera a exibição dos ganhos.  
- Erros na integração entre o back-end e o front-end.  
- Problemas de sincronização entre os sistemas de pagamento e exibição de dados.  
- Erros de arredondamento ou formatos de exibição incorretos.

**O que afeta?**  
Esse erro afeta diretamente a transparência e a confiança dos entregadores na plataforma, o que pode levar a um aumento no número de solicitações de suporte e até mesmo a uma queda na satisfação e no engajamento dos entregadores. A longo prazo, isso pode resultar em uma perda de competitividade para a plataforma, caso os entregadores não se sintam confiantes em relação ao sistema de pagamentos.

### 1.2 Lentidão em Algumas Telas/Etapas

**O que é?**  
A lentidão em algumas telas ou etapas refere-se ao atraso no tempo de resposta do sistema durante a navegação ou ao carregar informações. Quando os usuários, sejam clientes ou entregadores, interagem com a plataforma, eles esperam uma experiência ágil. Se o tempo de carregamento for elevado, isso pode causar frustração e até mesmo abandono da plataforma.

**O que pode ser a causa?**  
- Consultas ao banco de dados não otimizadas, que demoram para retornar os dados solicitados.  
- Carregamento de recursos pesados nas páginas, como imagens e scripts grandes.  
- Infraestrutura inadequada ou servidores mal configurados.  
- Problemas de rede ou de conexão com a internet. 

**O que afeta?**  
Esse problema afeta diretamente a experiência do usuário, diminuindo a satisfação e a probabilidade de o usuário continuar utilizando a plataforma. Em plataformas como a Rappi, onde a agilidade é crucial, uma lentidão excessiva pode levar a uma taxa de abandono maior e impactar negativamente a percepção do serviço. Isso, por sua vez, pode resultar em uma queda nas vendas e na fidelidade dos usuários, além de aumentar a taxa de desistência durante o processo de compra ou entrega.

## 2. Estratégia e Massa de Testes

### 2.1 Erros na Exibição dos Ganhos dos Entregadores 

#### a) Falhas na lógica de cálculo que gera a exibição dos ganhos

Neste caso, utilizarei o Cucumber com Gherkin para testar o comportamento esperado da exibição dos ganhos com base na lógica de cálculo.

1. Funcionalidade esperada: Verificar se o valor exibido corresponde ao valor calculado, considerando a lógica de cálculo correta.
   
2. Passos para criar o teste:
   - Feature File (usando Gherkin):

```gherkin
Feature: Verificação da exibição dos ganhos dos entregadores

  Scenario: Ganho exibido corretamente
    Given o sistema tem uma lógica de cálculo de ganhos baseada em taxas e entregas realizadas
    When o entregador solicita a exibição dos seus ganhos
    Then o valor exibido deve ser igual ao valor calculado pela lógica do sistema

  Scenario: Erro na exibição de ganhos
    Given o sistema tem uma lógica de cálculo de ganhos com falha na aplicação das taxas
    When o entregador solicita a exibição dos seus ganhos
    Then o valor exibido deve ser diferente do valor calculado, indicando um erro na lógica
```

   - **Step Definitions** (em JavaScript, ou outra linguagem que esteja usando):

```javascript
const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const sistema = require('../sistema'); // Simulação da lógica de cálculo

Given('o sistema tem uma lógica de cálculo de ganhos baseada em taxas e entregas realizadas', function () {
  // Configurar sistema com lógica de cálculo
});

When('o entregador solicita a exibição dos seus ganhos', function () {
  this.ganhoExibido = sistema.calcularGanhos(); // Método que simula o cálculo
});

Then('o valor exibido deve ser igual ao valor calculado pela lógica do sistema', function () {
  assert.strictEqual(this.ganhoExibido, sistema.ganhoCalculado);
});
```

3. **Execução**:
   - Você deve rodar o **Cucumber** para verificar se o comportamento está conforme esperado, especialmente para garantir que qualquer erro na lógica de cálculo seja identificado.
   - Caso o cálculo esteja errado, o teste falhará e você poderá corrigir a lógica.

---

#### b) **Problemas de sincronização entre os sistemas de pagamento e exibição de dados**

A sincronização entre os sistemas pode ser testada da mesma maneira. Vamos verificar se os dados de pagamento estão sendo atualizados corretamente e exibidos na interface em tempo real.

1. **Feature File** (Gherkin):

```gherkin
Feature: Verificação da sincronização entre o sistema de pagamento e a exibição dos dados

  Scenario: Sincronização correta dos dados
    Given o sistema de pagamento e o sistema de exibição de dados estão sincronizados
    When o entregador realiza uma entrega
    Then o valor de ganho exibido deve refletir a atualização do pagamento realizado

  Scenario: Sincronização falha dos dados
    Given o sistema de pagamento e o sistema de exibição de dados estão desincronizados
    When o entregador realiza uma entrega
    Then o valor exibido deve estar desatualizado e não refletir o valor real do pagamento
```

2. **Step Definitions**:

```javascript
Given('o sistema de pagamento e o sistema de exibição de dados estão sincronizados', function () {
  sistema.sincronizarPagamentosExibicao();
});

When('o entregador realiza uma entrega', function () {
  this.pagamento = sistema.processarEntrega();
});

Then('o valor de ganho exibido deve refletir a atualização do pagamento realizado', function () {
  assert.strictEqual(sistema.ganhoExibido, this.pagamento.valor);
});
```

3. **Execução**:
   - O teste irá validar se, ao realizar a entrega, o sistema de exibição é atualizado corretamente com o valor de pagamento.
   - Caso haja desincronização, o teste falhará.

---

### 2.2 **Lentidão em Algumas Telas/Etapas**

#### a) **Consultas ao banco de dados não otimizadas**

A performance de consultas ao banco de dados pode ser testada com o **JMeter**, já que ele é ideal para medir a latência e o tempo de resposta de consultas em sistemas de backend.

1. **Testando com JMeter**:
   - Configure uma **Request HTTP** no **JMeter** para simular uma consulta ao banco de dados que represente uma consulta comum feita na plataforma.
   - Realize o teste para medir o tempo de resposta da consulta.

2. **Passos**:
   - No JMeter, crie um novo **Test Plan**.
   - Adicione um **Thread Group** e configure o número de usuários virtuais para simular a carga.
   - Adicione uma **HTTP Request** para simular a consulta ao banco.
   - Utilize o **View Results Tree** ou **Summary Report** para medir o tempo de resposta.
   - Analise os resultados. Se o tempo de resposta for maior que o aceitável (ex: mais de 2 segundos), a consulta pode precisar de otimização.

#### b) **Carregamento de recursos pesados nas páginas**

Para testar a performance do carregamento de recursos (como imagens e scripts pesados) nas páginas, podemos também usar o **JMeter** para medir o tempo de carregamento completo da página ou do recurso específico.

1. **Testando com JMeter**:
   - Crie um **HTTP Request** para simular o carregamento da página que contém os recursos pesados.
   - Use o **HTML Parser** no JMeter para capturar todos os recursos carregados (como imagens, CSS, JS).
   - Meça o tempo total de carregamento da página.

2. **Passos**:
   - No **Test Plan** do JMeter, crie um **Thread Group** e adicione a **HTTP Request** para carregar a página.
   - Use o **HTML Parser** para identificar todos os recursos carregados.
   - Analise os resultados no **Summary Report** e observe o tempo total de carregamento. Se os recursos pesados causarem atraso no tempo de carregamento, será necessário otimizá-los.

---

### Resumo da Estratégia

- **Cucumber com Gherkin**: Ideal para testar comportamentos específicos e garantir que as regras de negócio estão sendo corretamente aplicadas no sistema, como a exibição dos ganhos e a sincronização dos dados.
- **JMeter**: Melhor ferramenta para medir a performance e tempo de resposta de consultas ao banco de dados e carregar recursos pesados nas páginas, garantindo que a latência seja minimizada.

Essa combinação de ferramentas ajudará a validar tanto os aspectos funcionais quanto de performance da sua aplicação.


