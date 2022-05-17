import { PokemonService } from './../pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from './../pokemon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="center">
      Editer {{ pokemon?.name }}
    </h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture" alt="">
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon|undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id'); //chercher l'id du pokemon
    if(pokemonId) {       //chercher le pokémon associé
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    } else {          //undefined si tu trouves pas
      this.pokemon = undefined
    }
  }

}
