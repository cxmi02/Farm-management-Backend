import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Animal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  species: string;

  @Prop()
  age: number;

  @Prop({ default: false })
  isDangerous: boolean;

  @Prop({ type: [String], default: [] })
  restrictedWith: string[];
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
