export interface AtualizarMedicaoRequisicao {
  pressaoSistolica: number;
  pressaoDiastolica: number;
  frequenciaCardiaca: number;
  oxigenacaoSangue: number;
  pesoCorporal: number;
  faltaDeAr: boolean;
  dorNoPeito: boolean;
  tontura: boolean;
  registradaEm: string | null;
}
