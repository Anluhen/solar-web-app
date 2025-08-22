import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { EnviosService } from './envios.service';
import type { UpdateEnvioDto, CreateEnvioDto } from './envios.service';

@Controller('envios')
export class EnviosController {
  constructor(private readonly service: EnviosService) { }

  @Get()
  async list() {
    return await this.service.list();
  }

  @Post()
  async create(@Body() dto: CreateEnvioDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const envio = await this.service.get(id);
    if (!envio) {
      throw new NotFoundException('Envio not found.');
    }
    return envio;
  }

  @Get(':id/materiais')
  async getMateriais(@Param('id', ParseIntPipe) id: number) {
    const materiais = await this.service.getMateriais(id);
    return materiais;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEnvioDto,
  ) {
    const hasAnyField =
      body.pep !== undefined ||
      body.zvgp !== undefined ||
      body.gerador !== undefined ||
      body.observacoes !== undefined ||
      body.status !== undefined;

    if (!hasAnyField) {
      throw new BadRequestException('No fields to update.');
    }

    const updated = await this.service.update(id, body);
    if (!updated) {
      throw new NotFoundException('Envio not found.');
    }
    return updated;
  }

}