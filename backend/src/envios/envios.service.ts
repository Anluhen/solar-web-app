import { Inject, Injectable } from '@nestjs/common';
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
}