import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';

import { UsuarioService } from '../../services/usuario.service';
import { CadastrarUsuarioRequisicao } from '../../models/cadastrar-usuario-requisicao.model';
import { PageShellComponent } from '../../../shared/components/page-shell/page-shell.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonText,
    PageShellComponent,
  ],
})
export class CadastroPage {
  mensagemErro = '';
  mostrarSenha = false;
  mostrarConfirmacaoSenha = false;

  usuario: CadastrarUsuarioRequisicao = {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: '',
    dataNascimento: '',
    sexo: 'PrefiroNaoInformar',
    paisResidencia: '',
  };

  sexos = [
    { valor: 'Masculino', label: 'Masculino' },
    { valor: 'Feminino', label: 'Feminino' },
    { valor: 'Outro', label: 'Outro' },
    { valor: 'PrefiroNaoInformar', label: 'Prefiro nao informar' },
  ];

  paises = [
    'Brasil',
    'Argentina',
    'Chile',
    'Colombia',
    'Mexico',
    'Portugal',
    'Estados Unidos',
    'Canada',
    'Espanha',
    'Outro',
  ];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  cadastrar(): void {
    this.mensagemErro = '';

    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        this.mensagemErro = this.obterMensagemErro(erro);
      },
    });
  }

  private obterMensagemErro(erro: any): string {
    const errors = erro?.error?.errors;

    if (errors) {
      const mensagens = Object.values(errors).reduce<string[]>((resultado, valor) => {
        if (Array.isArray(valor)) {
          return resultado.concat(valor);
        }

        if (typeof valor === 'string') {
          resultado.push(valor);
        }

        return resultado;
      }, []);

      return mensagens.join(' ');
    }

    if (erro?.error?.detail) {
      return erro.error.detail;
    }

    if (erro?.error?.title) {
      return erro.error.title;
    }

    return 'Nao foi possivel realizar o cadastro. Verifique os dados informados.';
  }
}
