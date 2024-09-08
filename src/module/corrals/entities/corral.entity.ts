import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Corral extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1, max: 50 })
  capacity: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Animal' }] })
  animals: string[];
}

export const CorralSchema = SchemaFactory.createForClass(Corral);
