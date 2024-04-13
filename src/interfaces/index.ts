export interface IPokemonList {
  name: string
  url: string
}

export interface IPokemon {
  name: string
  id: number
  abilities: {
    ability: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
    back_default: string
    front_shiny: string
    back_shiny: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
    }
  }[]
}