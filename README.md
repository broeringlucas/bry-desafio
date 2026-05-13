# Bry Desafio

Aplicativo de previsão do tempo desenvolvido em React Native (Expo) que permite buscar cidades, visualizar previsões de 7 dias e funciona offline com cache local.

## Project Structure 

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

## Technologies Used

**Frontend:** React Native · Expo 54 · TypeScript  

**State Management:** TanStack Query (React Query)  

**Navigation:** Expo Router (file-based routing com rotas dinâmicas)  

**HTTP Client:** Axios  

**Storage:** @react-native-async-storage/async-storage  

**Charts:** react-native-gifted-charts  

**Icons:** @expo/vector-icons  

**Location:** expo-location  

**Testing:** Jest · @testing-library/react-native  

## How to run 

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

## How to run tests 

1. Rode npm test no root do projeto.

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
