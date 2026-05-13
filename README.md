# Bry Desafio

Aplicativo de previsão do tempo desenvolvido em React Native (Expo) que permite buscar cidades, visualizar previsões de 7 dias e funciona offline com cache local.

## Estrutura do Projeto

```
bry-desafio/
├── app/
│   ├── details/
│   │   └── [date].tsx                          # Tela de detalhes da previsão (rota dinâmica)
│   ├── _layout.tsx                             # Configuração de navegação
│   └── index.tsx                               # Tela principal (Home)
├── src/
│   ├── tests/                                  # Testes 
│       ├── common/                             # Testes de componentes comuns
│       ├── home/                               # Testes da home (components, services)
│       └── screens/                            # Testes de telas
│   ├── common/
│       ├── components/                         # Componentes reutilizáveis
│           ├── LoadingIndicator.tsx
│           ├── ErrorState.tsx
│           └── EmptyState.tsx
│       ├── core/
│       │   ├── api/                            # Configuração do Axios
│       │   ├── constants/                      # Constantes da aplicação
│       │   └── storage/                        # Gerenciamento de cache (AsyncStorage)
│       ├── exceptions/
│       ├── hooks/
│       │   └── useLocation.ts                  # Hook de geolocalização
│       ├── mappers/                            # Mapeamento de erros
│       ├── services/                           # Serviço de geolocalização
│       └── utils/
│           └── formatters/                     # Funções de formatação (datas, horas)
│   ├── details/
│       └── components/                         # Componentes da tela de detalhes
│           ├── DetailCard.tsx
│           ├── HourlyCard.tsx
│           └── TemperatureChart.tsx
│   └── home/
│       ├── components/                         # Componentes da Home
│       │   ├── CitySearch.tsx                  # Busca de cidades com autocomplete
│       │   └── ForecastCard.tsx                # Card de previsão do dia
│       ├── hooks/
│           ├── useCitySearch.ts                # Hook de busca de cidades
│           └── useForecast.ts                  # Hook de previsões (React Query)
│       ├── mappers/                            # Mapeamento de respostas da API
│       ├── models/                             # Tipos TypeScript
│       ├── services/                           # Chamadas à API
│       ├── states/                             # Tipos de estado
│       ├── types/                              # Tipos da API
│       └── utils/                              # Utilitários da home
├── app.json                                    # Configuração do Expo
├── babel.config.js                             # Configuração do Babel
├── env.d.ts                                    # Tipos das variáveis de ambiente
├── eslint.config.js                            # Configuração do ESLint
├── jest.config.js                              # Configuração do Jest
├── package-lock.json                           # Lockfile de dependências
├── package.json                                # Dependências do projeto
├── README.md                                   # Documentação
└── tsconfig.json                               # Configuração do TypeScript      
```

## Features

- **Busca de Cidades:** Pesquise cidades com autocomplete, debounce (400ms) e tratamento de erros
- **Previsão de 7 dias:** Visualize temperatura, umidade e condições climáticas
- **Detalhes do dia:** Gráfico de variação de temperatura, nascer/pôr do sol, velocidade do vento
- **Modo Offline:** Cache automático dos dados com AsyncStorage, funcionando sem internet
- **Pull to Refresh:** Atualize os dados arrastando a lista para baixo
- **Geolocalização:** Detecta automaticamente a localização do usuário
- **Gráficos Interativos:** Visualize a variação de temperatura ao longo do dia
- **Tratamento de Erros:** Exceptions customizadas (Network, Unauthorized, Forbidden, BadRequest, Api)

## Tecnologias usadas

**Frontend:** React Native · Expo 54 · TypeScript  

**State Management:** TanStack Query (React Query) -  Gerenciamento de estado assíncrono, cache automático e sincronização de dados

**Navigation:** Expo Router (file-based routing com rotas dinâmicas)  

**HTTP Client:** Axios  - Cliente HTTP para comunicação com a WeatherAPI

**Storage:** @react-native-async-storage/async-storage - Armazenamento local para cache offline dos dados de previsão

**Charts:** react-native-gifted-charts  

**Icons:** @expo/vector-icons  

**Location:** expo-location - Captura da localização do usuário para previsão automática

**Testing:** Jest · @testing-library/react-native  

## Como rodar

1. Clone o repositório:: git clone [https://github.com/broeringlucas/easy-saving.git](https://github.com/broeringlucas/easy-saving)
2. Navigate to the directory: cd bry-desafio
3. Instale as dependências: npm install
4. Crie um arquivo .env na raiz do projeto.
    <details>
    <summary>exemplo do .env</summary>
    
    ```
    API_KEY=
    ```
    
    </details>  
5. Inicie o app:  npx expo start 

Também rodei usando o Radon IDE. 

## Como rodar os testes

1. Rode npm test no root do projeto.

## Observação

O aplicativo foi testado em iOS físico, emulador iOS e emulador Android. A funcionalidade de localização utilizando Expo Location apresentou comportamento inconsistente em emuladores, mas em dispositivos físicos o funcionamento ocorreu corretamente.

Foi utilizado TanStack Query (React Query) para gerenciamento de cache, sincronização de estado assíncrono, controle de loading/refetch e persistência dos dados da previsão do tempo. A biblioteca ajudou principalmente no cache de requisições, atualização automática, estados de loading/error e pull-to-refresh.

Sobre os dados offline, fiquei em dúvida. Pesquisei sobre react-query-persister, mas optei por usar o AsyncStorage e fazer na mão, por já conhecer a tecnologia.

O projeto foi organizado utilizando uma estrutura baseada em módulos/features dentro da pasta src, buscando separar responsabilidades e facilitar manutenção. Por falta de tempo, acho que essa separação poderia ter sido melhor: common para componentes e utilidades reutilizáveis entre módulos, home para regras de negócio relacionadas ao clima e details para a tela de detalhes.

Uma dificuldade encontrada foi a implementação do componente de autocomplete de cidades (CitySearch.tsx). Como a tela já possuía um ScrollView, ocorreram conflitos de scroll com o dropdown do autocomplete.

Foram tratados os principais estados de erro retornados pela API, porém podd ter ficado alguma exceção de fora.

## Screenshots 
<details>
<summary>Screenshot 1</summary>
    
</details>

<details>
<summary>Screenshot 2</summary>
  

</details>

<details>
<summary>Screenshot 3</summary>
  

</details>

<details>
<summary>Screenshot 4</summary>

</details>
