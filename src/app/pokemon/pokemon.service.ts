import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}
  
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => console.table(pokemonList)),
      catchError((error) => this.handleError(error, undefined))
    )
  }


  
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(` api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
  } 

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length <= 1) {  //2lettres minimum pour faire une recherche
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  updatePokemon (pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    }

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )}

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  private log(response: any) {
    console.table(response)
  } 

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue)
  }

  getPokemonTypeList(): string[] {
    return [
    'Plante',
    'Feu',
    'Eau',
    'Insecte',
    'Normal',
    'Electrik',
    'Poison',
    'Fée',
    'Vol',
    'Combat',
    'Psy']
  }
}
