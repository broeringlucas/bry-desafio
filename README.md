# Bry Desafio

WeatherApp é um aplicativo de previsão do tempo desenvolvido em React Native (Expo) que permite buscar cidades, visualizar previsões de 7 dias e funciona offline com cache local.

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

1. Clone o repositório:: git clone [git@github.com:broeringlucas/bry-desafio.git](https://github.com/broeringlucas/bry-desafio)
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
6. Baixei o expo go no meu celular e escaniei o QRCODE

Outra forma que rodei: 
1. Fazer prebuild com: npx expo prebuild
2. Abri um emulador com o Radon IDE (Baixei extensão no vs code).
3. Inicie o app: npx expo start, escolha um emulador tecla a (android) e i (ios).

## Como rodar os testes

1. Rode npm test no root do projeto.

## Observação

O aplicativo foi testado em iOS físico, emulador iOS e emulador Android. A funcionalidade de localização utilizando Expo Location apresentou comportamento inconsistente em emuladores, mas em dispositivos físicos o funcionamento ocorreu corretamente.

Foi utilizado TanStack Query (React Query) para gerenciamento de cache, sincronização de estado assíncrono, controle de loading/refetch e persistência dos dados da previsão do tempo. A biblioteca ajudou principalmente no cache de requisições, atualização automática, estados de loading/error e pull-to-refresh.

Sobre os dados offline, fiquei em dúvida. Eu fiz das duas formas, os dados persistem por 10 minutos usando o react-query, para cada cidade. E também usei o async-storage para persistir dados apenas da última cidade no storage. Ele vai escrevendo por cima a cada consulta.

O projeto foi organizado utilizando uma estrutura baseada em módulos/features dentro da pasta src, buscando separar responsabilidades e facilitar manutenção. Separação: common para componentes e utilidades reutilizáveis entre módulos, home para regras de negócio relacionadas ao clima e details para a tela de detalhes. Talvez poderia ser melhor separado.

Uma dificuldade encontrada foi a implementação do componente de autocomplete de cidades (CitySearch.tsx). Como a tela já possuía um ScrollView, ocorreram conflitos de scroll com o dropdown do autocomplete.

Foram tratados os principais estados de erro retornados pela API, porém pode ter ficado alguma exceção de fora.

## Screenshots/Vídeos
<details>
<summary>Screenshot</summary>
<img width="588" height="1280" alt="home" src="https://github.com/user-attachments/assets/01bb1a2b-d6df-4e3a-a686-63da0a54d31d" />

</details>

<details>
Na captura de tela do iPhone não mostra a dialog de pedir permissão para usar a loc.
<summary>Vídeo</summary>

https://github.com/user-attachments/assets/e813aaac-2012-4d7b-b61a-bef9c18f0769

</details>
