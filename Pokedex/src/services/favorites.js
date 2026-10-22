import { supabase } from '../lib/supabaseClient'

// Serviço de favoritos usando o Supabase.
// Tabela esperada (sem login):
//
//   create table public.favorites (
//     pokemon_id integer primary key
//       references public.pokemons(id) on delete cascade,
//     created_at timestamptz default now()
//   );
//
// As políticas de RLS liberam select/insert/delete público (ver README).
// O nome do Pokémon não é guardado aqui: ele vem do pokedex-data.json
// (ou da tabela public.pokemons) a partir do pokemon_id.

const TABLE = 'favorites'

/**
 * Busca todos os favoritos salvos, dos mais recentes para os mais antigos.
 * @returns {Promise<Array<{ pokemon_id: number }>>}
 */
export async function fetchFavorites() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('pokemon_id, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

/**
 * Adiciona um Pokémon aos favoritos.
 * @param {{ id: number }} pokemon
 */
export async function addFavorite(pokemon) {
  const { error } = await supabase
    .from(TABLE)
    .insert({ pokemon_id: pokemon.id })

  if (error) throw error
}

/**
 * Remove um Pokémon dos favoritos pelo id.
 * @param {number} pokemonId
 */
export async function removeFavorite(pokemonId) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('pokemon_id', pokemonId)

  if (error) throw error
}
