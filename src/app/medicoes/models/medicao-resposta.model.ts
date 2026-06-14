import { SintomasResposta } from './sintomas-resposta.model';

export interface MedicaoResposta {
  id: string;
  usuarioId: string;
  pressaoSistolica: number;
  pressaoDiastolica: number;
  frequenciaCardiaca: number;
  oxigenacaoSangue: number;
  pesoCorporal: number;
  sintomas: SintomasResposta;
  possuiSintomas: boolean;
  registradaEm: string;
  criadaEm: string;
}
