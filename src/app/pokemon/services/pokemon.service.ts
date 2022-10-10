import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchAllPokemonResponse, Pokemon } from '../interfaces/pokemon.interface';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url:string = 'https://pokeapi.co/api/v2'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPokemons():Observable<Pokemon[]>{
    return this.httpClient.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
      .pipe(
        map( this.transformSmallPokemonIntoPokemon)
      );
  }

  private transformSmallPokemonIntoPokemon(resp:FetchAllPokemonResponse): Pokemon[]{
      const pokemonList:Pokemon[] = resp.results.map( poke => {
        const urlArr = poke.url.split('/')
        const id = urlArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return {
          id,
          pic,
          name:poke.name

        }
      })

      return pokemonList;
  }
}
