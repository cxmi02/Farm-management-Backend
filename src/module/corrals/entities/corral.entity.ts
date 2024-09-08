import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Corral extends Document {
  @Prop({ required: true })
  corralId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: [String] })
  animals: string[];
}

export const CorralSchema = SchemaFactory.createForClass(Corral);
