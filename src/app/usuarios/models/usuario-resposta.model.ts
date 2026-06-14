import { Sexo } from './sexo.model';

export interface UsuarioResposta {
  id: string;
  nome: string | null;
  sobrenome: string | null;
  nomeCompleto: string | null;
  email: string | null;
  telefone: string | null;
  dataNascimento: string;
  sexo: Sexo;
  paisResidencia: string | null;
  criadoEm: string;
}
