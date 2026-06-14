import { Sexo } from './sexo.model';

export interface CadastrarUsuarioRequisicao {
  nome: string | null;
  sobrenome: string | null;
  email: string | null;
  telefone: string | null;
  senha: string | null;
  confirmacaoSenha: string | null;
  dataNascimento: string;
  sexo: Sexo;
  paisResidencia: string | null;
}
