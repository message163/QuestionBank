import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { MongodbUrl } from '@questionbank/config/database';

@Module({
  imports: [MongooseModule.forRoot(MongodbUrl)],
  controllers: [],
  providers: [],
})
export class DbModule { }
