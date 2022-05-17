import { PokemonService } from './../pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from './../pokemon';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();    //{flux d'info: ..."a".."ab".."abe".."abz"..}
  pokemons$: Observable<Pokemon[]>;   // {..pokemonList(a) ...pokemonList(ab)...}

  constructor(
    private router: Router,
    private pokemonService: PokemonService
              ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe( 
      debounceTime(300), //{...'a'.'ab'...'abz'.'ab'...'abc'....} flux d'event
      distinctUntilChanged(), //{....."ab"........."abc"}
      switchMap((term) => this.pokemonService.searchPokemonList(term))  //{.....pokemonList(ab).....pokemonList(abc)}
    )
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link)
  }
}
