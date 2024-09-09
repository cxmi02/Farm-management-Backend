import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Animal } from '../../animals/entities/animals.entity.dto';

@Schema({ timestamps: true })
export class Corral extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1, max: 50 })
  capacity: number;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Animal.name }],
    default: [],
  })
  animals: MongooseSchema.Types.ObjectId[];
}

export const CorralSchema = SchemaFactory.createForClass(Corral);
