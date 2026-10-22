# Pokédex Kanto

Aplicação web (React + Vite) que exibe os 151 Pokémon da região de Kanto com
busca, tela de detalhes, seção de treinadores e insígnias.

## Como rodar

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install     # instala as dependências
npm run dev     # sobe o servidor de desenvolvimento (http://localhost:5173)
npm run build   # gera a build de produção em dist/
npm run preview # pré-visualiza a build de produção
npm run lint    # roda o ESLint
```

## Estrutura

```
Pokedex/
├─ public/                 # favicon e ícones estáticos
├─ src/
│  ├─ components/
│  │  ├─ PokemonModal.jsx   # modal de detalhes do Pokémon
│  │  ├─ PokemonModal.css
│  │  ├─ TrainersSection.jsx# seção de treinadores e insígnias
│  │  └─ TrainersSection.css
│  ├─ data/
│  │  ├─ pokedex-data.json  # 151 Pokémon (stats + tipos) e os 18 tipos
│  │  └─ trainers-data.json # líderes de ginásio, insígnias e times
│  ├─ utils/
│  │  └─ pokemon.js         # helpers: sprites, cores de tipo, relacionados
│  ├─ App.jsx               # monta busca + grid + modal + treinadores
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
└─ index.html
```

## Funcionalidades

### Detalhes do Pokémon (modal)

Clicar em qualquer card abre o `PokemonModal`, com:

- Arte oficial em alta resolução (PokéAPI), com fallback para o sprite menor.
- Número da Pokédex e tipos coloridos.
- Estatísticas base (HP, Ataque, Defesa, Ataque Esp., Defesa Esp., Velocidade)
  em barras de progresso, mais o total.
- Pokémon relacionados (mesmo tipo e próximos na numeração), clicáveis para
  navegar entre eles sem fechar o modal.
- Fecha com a tecla `Esc`, clique no fundo ou no botão ×.

### Treinadores e insígnias

A seção `TrainersSection` lista os líderes de ginásio de Kanto. Cada card traz
o nome, a cidade, o tipo de especialidade, a insígnia e o time de Pokémon.
Clicar em um Pokémon do time abre o modal de detalhes correspondente.

### Imagens

As imagens vêm dos sprites oficiais da [PokéAPI](https://github.com/PokeAPI/sprites),
resolvidas pelo `id` do Pokémon. Não é necessário armazenar imagens localmente.

## Integração entre os integrantes

O `App.jsx` foi montado para receber os componentes de lista e busca dos demais
integrantes com o mínimo de atrito. Os pontos de integração estão marcados com
comentários `=== PONTO DE INTEGRAÇÃO ===`:

- **Busca**: substituir o `<input>` por um componente `SearchBar` mantendo o
  estado `query`/`setQuery`.
- **Lista/cards**: substituir o grid por um componente `PokemonList` que receba
  `pokemon={filtered}` e chame `setSelected(pokemon)` no clique de cada card.

O contrato essencial para abrir os detalhes é chamar `setSelected(pokemon)`,
passando o objeto do Pokémon (com `id`, `name`, `stats`, `types`).

## Dados

- `pokedex-data.json`: 151 Pokémon com `id`, `name`, `stats` e `types`, além da
  lista dos 18 tipos.
- `trainers-data.json`: treinadores com `name`, `city`, `role`, `specialtyType`,
  `badge` (nome e cor) e `pokemonIds` (referência aos Pokémon pelo `id`).

## Stack

- React 19
- Vite 8
- ESLint
