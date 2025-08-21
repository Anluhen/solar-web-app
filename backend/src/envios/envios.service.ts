import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import type { Pool } from 'pg';

export type Envio = {
  id: number;
  pep: string;
  zvgp: string;
  gerador: string;
  observacoes: string | null;
  status: 'RASCUNHO' | 'ENVIADO' | 'CANCELADO';
  created_at: string;
  updated_at: string;
};

export type UpdateEnvioDto = {
  pep?: string;
  zvgp?: string;
  gerador?: string;
  observacoes?: string | null;
  status?: 'RASCUNHO' | 'ENVIADO' | 'CANCELADO';
};

@Injectable()
export class EnviosService {
  constructor(@Inject('PG') private readonly pool: Pool) { }

  async list(): Promise<Envio[]> {
    const sql = `
      SELECT id, pep, zvgp, gerador, observacoes,  status,
             to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
             to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
      FROM envios
      ORDER BY id ASC
      LIMIT 200
    `;
    const { rows } = await this.pool.query(sql);
    return rows;
  }

  async get(id: number): Promise<Envio | null> {
    const { rows } = await this.pool.query(
      `SELECT id, pep, zvgp, gerador, observacoes,  status,
             to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
             to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
      FROM envios
      WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  }

  async update(id: number, dto: UpdateEnvioDto): Promise<Envio | null> {
    // if (
    //   dto.status !== undefined &&
    //   !['RASCUNHO', 'ENVIADO', 'CANCELADO'].includes(dto.status)
    // ) {
    //   throw new BadRequestException(
    //     'Invalid status. Use RASCUNHO | ENVIADO | CANCELADO.',
    //   );
    // }
    
    const allowedKeys: (keyof UpdateEnvioDto)[] = [
      'pep',
      'zvgp',
      'gerador',
      'observacoes',
      'status',
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
      UPDATE envios
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, pep, zvgp, gerador, observacoes, status,
        to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as created_at,
        to_char(updated_at, 'YYYY-MM-DD"T"HH24:MI:SSZ') as updated_at
    `;

    const { rows } = await this.pool.query(sql, values);
    return rows[0] ?? null;
  }
}