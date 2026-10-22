// Utilitários compartilhados para lidar com os dados da Pokédex.
// Mantidos aqui para que os componentes dos demais integrantes (lista, busca)
// possam reaproveitar as mesmas funções na hora da integração.

/**
 * URL do sprite oficial do Pokémon na PokéAPI, obtido pelo id (1..151).
 * @param {number} id
 * @returns {string}
 */
export function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

/**
 * URL da arte oficial (maior resolução), usada no modal de detalhes.
 * @param {number} id
 * @returns {string}
 */
export function getArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

// Cor associada a cada tipo, por nome (igual ao campo "name" do JSON).
const TYPE_COLORS = {
  Typeless: '#68a090',
  Normal: '#a8a878',
  Fire: '#f08030',
  Water: '#6890f0',
  Grass: '#78c850',
  Electric: '#f8d030',
  Ice: '#98d8d8',
  Fighting: '#c03028',
  Poison: '#a040a0',
  Ground: '#e0c068',
  Flying: '#a890f0',
  Psychic: '#f85888',
  Bug: '#a8b820',
  Rock: '#b8a038',
  Ghost: '#705898',
  Dark: '#705848',
  Dragon: '#7038f8',
  Steel: '#b8b8d0',
}

/**
 * Retorna a cor de um tipo pelo nome; cai em um cinza neutro se desconhecido.
 * @param {string} typeName
 * @returns {string}
 */
export function getTypeColor(typeName) {
  return TYPE_COLORS[typeName] ?? '#777'
}

// Rótulos amigáveis para as chaves de stats do JSON.
export const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Ataque Esp.',
  specialDefense: 'Defesa Esp.',
  speed: 'Velocidade',
}

// Valor máximo usado para desenhar a barra de progresso dos stats.
export const MAX_STAT = 255

/**
 * Formata o número da Pokédex como #001, #025, #151 etc.
 * @param {number} id
 * @returns {string}
 */
export function formatDexNumber(id) {
  return `#${String(id).padStart(3, '0')}`
}

/**
 * Soma de todos os stats base de um Pokémon.
 * @param {object} pokemon
 * @returns {number}
 */
export function getTotalStats(pokemon) {
  return Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)
}

/**
 * Encontra Pokémon relacionados a partir dos dados existentes.
 * Critério: compartilham ao menos um tipo e são próximos na numeração da
 * Pokédex (mesma linha evolutiva tende a ficar em ids vizinhos na Gen 1).
 * @param {object} pokemon - Pokémon de referência
 * @param {object[]} allPokemon - lista completa
 * @param {number} limit - quantos retornar
 * @returns {object[]}
 */
export function getRelatedPokemon(pokemon, allPokemon, limit = 4) {
  const refTypeIds = new Set(pokemon.types.map((t) => t.id))

  return allPokemon
    .filter((p) => p.id !== pokemon.id)
    .map((p) => {
      const sharedTypes = p.types.filter((t) => refTypeIds.has(t.id)).length
      const dexDistance = Math.abs(p.id - pokemon.id)
      // Pontuação: prioriza tipos compartilhados, desempata por proximidade.
      const score = sharedTypes * 1000 - dexDistance
      return { pokemon: p, sharedTypes, score }
    })
    .filter((entry) => entry.sharedTypes > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.pokemon)
}
