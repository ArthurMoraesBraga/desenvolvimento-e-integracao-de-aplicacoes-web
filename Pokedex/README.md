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
│  ├─ hooks/
│  │  └─ useFavorites.js    # estado dos favoritos (carrega/alterna via Supabase)
│  ├─ lib/
│  │  └─ supabaseClient.js  # cliente do Supabase
│  ├─ pages/
│  │  ├─ Home.jsx           # Pokédex (busca + filtro + grid + modal)
│  │  ├─ Trainer.jsx        # seção de treinadores
│  │  └─ Favorites.jsx      # página de favoritos (Supabase)
│  ├─ services/
│  │  └─ favorites.js       # leitura/escrita na tabela favorites
│  ├─ utils/
│  │  └─ pokemon.js         # helpers: sprites, cores de tipo, relacionados
│  ├─ App.jsx               # monta busca + grid + modal + treinadores
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
└─ index.html
```

## Favoritos (Supabase)

A página **Favoritos** permite marcar Pokémon com um coração e salvá-los em um
banco de dados [Supabase](https://supabase.com/). Não há login: os favoritos
ficam em uma tabela pública compartilhada.

### 1. Variáveis de ambiente

Copie `.env.example` para `.env` e preencha com as credenciais do seu projeto
(Supabase > Project Settings > API):

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_publishable_key_aqui
```

O arquivo `.env` está no `.gitignore` e não deve ser commitado.

### 2. Tabela no Supabase

No SQL Editor do Supabase, rode:

```sql
create table public.favorites (
  pokemon_id integer primary key
    references public.pokemons(id) on delete cascade,
  created_at timestamptz default now()
);

alter table public.favorites enable row level security;

create policy "Leitura pública de favoritos"
  on public.favorites for select to anon, authenticated using (true);
create policy "Inserção pública de favoritos"
  on public.favorites for insert to anon, authenticated with check (true);
create policy "Remoção pública de favoritos"
  on public.favorites for delete to anon, authenticated using (true);
```

> A coluna `name` não é guardada em `favorites`: o nome do Pokémon vem do
> `pokedex-data.json` (ou da tabela `public.pokemons`) a partir do `pokemon_id`.
> A chave estrangeira para `public.pokemons(id)` só funciona se você já tiver
> criado e populado essa tabela. Se ainda não tiver a tabela `pokemons`, remova
> a linha `references public.pokemons(id) on delete cascade`.

### Como funciona

- `src/lib/supabaseClient.js`: cria o cliente do Supabase a partir do `.env`.
- `src/services/favorites.js`: funções `fetchFavorites`, `addFavorite` e
  `removeFavorite` que falam com a tabela `favorites`.
- `src/hooks/useFavorites.js`: hook que carrega os favoritos, mantém um `Set`
  de ids e expõe um `toggleFavorite` otimista (atualiza a UI na hora e desfaz
  se o Supabase retornar erro).
- `src/pages/Favorites.jsx`: página que mapeia os ids salvos de volta para os
  Pokémon do `pokedex-data.json` e reaproveita a `PokemonList` e o modal.
- Cada `PokemonCard` ganha um botão de coração (🤍 / ❤️) e o `Header` mostra o
  total de favoritos.

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
- Supabase (`@supabase/supabase-js`) para os favoritos
- ESLint
