import { Inject, Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import type { Pool } from 'pg';

export type UpdateMaterialDto = {
  sap?: string;
  descricao?: string;
  quantidade?: number;
};

export type Material = {
  id: number;
  envio_id: number;
  sap: number;
  descricao: string;
  quantidade: number;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class MateriaisService {
  private readonly logger = new Logger(MateriaisService.name);
  constructor(@Inject('PG_POOL') private readonly pool: Pool) { }

  async get(id: number): Promise<Material | null> {
    try {
      const { rows } = await this.pool.query(
        `SELECT id, envio_id, sap, descricao, quantidade,
             to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
             to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
      FROM materiais
      WHERE id = $1`,
        [id],
      );
      return rows[0] ?? null;
    } catch (err) {
      this.logger.error('get error:', err);
      throw new InternalServerErrorException('Failed to fetch material.');
    }
  }

  async create(dto: {
    envio_id: number;
    sap: string;
    descricao: string;
    quantidade: number;
  }) {
    try {
      const { rows } = await this.pool.query(
        `INSERT INTO materiais(envio_id, sap, descricao, quantidade, created_at, updated_at)
      VALUES($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, envio_id, sap, descricao, quantidade,
      to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
      to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
    `,
        [dto.envio_id, dto.sap, dto.descricao, dto.quantidade]
      );

      return rows[0];
    } catch (err) {
      this.logger.error('create error:', err);
      throw new InternalServerErrorException('Failed to create material.');
    }
  }

  async update(id: number, dto: UpdateMaterialDto) {
    try {
      const allowedKeys: (keyof UpdateMaterialDto)[] = [
        'sap',
        'descricao',
        'quantidade',
      ];

      const setClauses: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      for (const key of allowedKeys) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
          setClauses.push(`${key} = $${paramIndex++}`);
          values.push((dto as any)[key]);
        }
      }

      if (setClauses.length === 0) {
        throw new BadRequestException('No valid fields provided for update.');
      }

      setClauses.push(`updated_at = NOW()`);

      values.push(id);

      const sql = `
      UPDATE materiais
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, sap, descricao, quantidade,
               to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
               to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
    `;

      const { rows } = await this.pool.query(sql, values);
      return rows[0] ?? null;
    } catch (err) {
      this.logger.error('update error:', err);
      throw new InternalServerErrorException('Failed to update material.');
    }
  }

  async remove(id: number) {
    try {
      const sql = `DELETE FROM materiais WHERE id = $1`;
      const { rowCount } = await this.pool.query(sql, [id]);
      return rowCount > 0;
    } catch (err) {
      this.logger.error('remove error:', err);
      throw new InternalServerErrorException('Failed to remove material.');
    }
  }
}