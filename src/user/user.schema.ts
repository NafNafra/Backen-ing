  // src/your-module/your-model.schema.ts
  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { Document } from 'mongoose';

  @Schema()
  export class UserDocument extends Document {
    @Prop({ required: true })
    username: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;
  }

  export const UserDocumentSchema = SchemaFactory.createForClass(UserDocument);