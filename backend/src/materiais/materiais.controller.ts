import { Body, Controller, Delete, Param, ParseIntPipe, Put, Get } from '@nestjs/common';
import { MateriaisService } from './materiais.service';

class UpdateMaterialDto {
  sap?: string;
  descricao?: string;
  quantidade?: number;
}

@Controller('materiais')
export class MateriaisController {
  constructor(private readonly service: MateriaisService) { }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const envio = await this.service.get(id);
    if (!envio) {
      return { error: 'Not Found' };
    }
    return envio;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto
  ) {
    const row = await this.service.update(id, dto);
    if (!row) {
      return { error: 'Not Found' };
    }
    return row; // retorna o material atualizado
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const ok = await this.service.remove(id);
    if (!ok) {
      return { error: 'Not Found' };
    }
    return { ok: true };
  }
}
