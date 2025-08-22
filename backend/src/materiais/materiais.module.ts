import { Module } from '@nestjs/common';
import { DatabaseModule, PG_POOL } from '../database/database.module';
import { MateriaisService } from './materiais.service';
import { MateriaisController } from './materiais.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MateriaisController],
  providers: [
    MateriaisService,
    { provide: 'PG', useExisting: PG_POOL },
  ],
})
export class MateriaisModule {}