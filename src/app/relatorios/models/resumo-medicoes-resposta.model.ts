import { EstatisticaResposta } from './estatistica-resposta.model';
import { FrequenciaSintomasResposta } from './frequencia-sintomas-resposta.model';

export interface ResumoMedicoesResposta {
  totalMedicoes: number;
  primeiraMedicaoEm: string | null;
  ultimaMedicaoEm: string | null;
  pressaoSistolicaEstatistica: EstatisticaResposta;
  pressaoDiastolicaEstatistica: EstatisticaResposta;
  frequenciaCardiacaEstatistica: EstatisticaResposta;
  oxigenacaoSangueEstatistica: EstatisticaResposta;
  pesoCorporalEstatistica: EstatisticaResposta;
  sintomas: FrequenciaSintomasResposta;
}
