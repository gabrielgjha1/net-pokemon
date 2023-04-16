import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginations: PaginationDto) {
    const {limit = 10, offset = 0} = paginations;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
  }

  async findOne(id: string) {
    let pokemon: Pokemon;
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: id });
    }

    if (isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: id.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(`Poquemon con ese id ${id} no existe`);

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      try {
        const updatePokemon = await this.pokemonModel.findByIdAndUpdate(
          pokemon.id,
          updatePokemonDto,
        );
        return updatePokemon;
      } catch (error) {
        this.handleExceptions(error);
      }
    }
  }
  async remove(id: string) {

    // const result = await this.pokemonModel.findByIdAndDelete(id);
     const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});

     if(deletedCount === 0){

      throw new BadRequestException(`Pokemon con id  no existe`);

     }
     
    return ;


  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon  existe en db ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      throw new InternalServerErrorException(
        `No se pudo crear, revisar los logs`,
      );
    }
  }
}
