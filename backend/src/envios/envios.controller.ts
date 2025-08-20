import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EnviosService } from './envios.service';

@Controller('envios')
export class EnviosController {
  constructor(private readonly service: EnviosService) { }

  @Get()
  async list() {
    return await this.service.list();
  }

  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number) {
    const envio = await this.service.get(id);
    if (!envio) {
      return { error: 'Not Found' };
    }
    return envio;
  }
}