import { MedicaoResposta } from '../../medicoes/models/medicao-resposta.model';

export interface HistoricoMedicoesResposta {
  total: number;
  medicoes: MedicaoResposta[] | null;
}
