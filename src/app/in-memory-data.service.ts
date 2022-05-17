import { POKEMONS } from './pokemon/mock-pokemon-list';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pokemons = POKEMONS;
    return { pokemons };
  }
}
