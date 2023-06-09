import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async excecuteSeed() {
    let arreglo = [];
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      arreglo.push({ name, no });
    });
    const result = await this.pokemonModel.insertMany(arreglo);

    return result;
  }
}
