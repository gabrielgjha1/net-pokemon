import { isValidObjectId } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('MAL')
    }
    return id;
  }
}
