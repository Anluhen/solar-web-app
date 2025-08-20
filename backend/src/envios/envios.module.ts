import { Module } from '@nestjs/common';
import { DatabaseModule, PG_POOL } from '../database/database.module';
import { EnviosService } from './envios.service';
import { EnviosController } from './envios.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EnviosController],
  providers: [
    EnviosService,
    { provide: 'PG', useExisting: PG_POOL },
  ],
})
export class EnviosModule {}