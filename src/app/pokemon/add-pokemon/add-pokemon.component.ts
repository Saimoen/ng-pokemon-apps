import { Pokemon } from '../pokemon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2 class="center">
      Ajouter un pokémon
    </h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
})
export class AddPokemonComponent implements OnInit {

  pokemon: Pokemon;

  ngOnInit() {
    this.pokemon = new Pokemon();
  }

}
