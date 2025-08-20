export interface Envio {
    id: number;
    pep: string;
    zvgp: string;
    gerador: string;
    status: 'RASCUNHO' | 'ENVIADO' | 'CANCELADO';
    observacoes: string | null;
    created_at: string;
    updated_at: string;
};