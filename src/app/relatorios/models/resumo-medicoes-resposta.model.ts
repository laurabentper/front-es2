import { EstatisticaResposta } from './estatistica-resposta.model';
import { FrequenciaSintomasResposta } from './frequencia-sintomas-resposta.model';

export interface ResumoMedicoesResposta {
  totalMedicoes: number;
  primeiraMedicaoEm: string | null;
  ultimaMedicaoEm: string | null;
  pressaoSistolica: EstatisticaResposta;
  pressaoDiastolica: EstatisticaResposta;
  frequenciaCardiaca: EstatisticaResposta;
  oxigenacaoSangue: EstatisticaResposta;
  pesoCorporal: EstatisticaResposta;
  sintomas: FrequenciaSintomasResposta;
}
