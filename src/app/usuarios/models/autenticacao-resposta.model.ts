import { UsuarioResposta } from './usuario-resposta.model';

export interface AutenticacaoResposta {
  token: string | null;
  expiraEm: string;
  usuario: UsuarioResposta;
}
