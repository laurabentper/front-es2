import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/angular/standalone';

import { UsuarioService } from '../../services/usuario.service';
import { Sexo } from '../../models/sexo.model';
import { CadastrarUsuarioRequisicao } from '../../models/cadastrar-usuario-requisicao.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonText,
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
    { valor: 'PrefiroNaoInformar', label: 'Prefiro não informar' },
  ];

  paises = [
    'Brasil',
    'Argentina',
    'Chile',
    'Colômbia',
    'México',
    'Portugal',
    'Estados Unidos',
    'Canadá',
    'Espanha',
    'Outro',
  ];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) { }

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

    return 'Não foi possível realizar o cadastro. Verifique os dados informados.';
  }
}

