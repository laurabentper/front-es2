import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { PageShellComponent } from '../../../shared/components/page-shell/page-shell.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    PageShellComponent,
  ],
})
export class LoginPage {
  email = '';
  senha = '';
  mensagemErro = '';

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) {}

  entrar(): void {
    this.mensagemErro = '';

    this.usuarioService.login({
      email: this.email,
      senha: this.senha,
    }).subscribe({
      next: (resposta) => {
        if (resposta.token) {
          this.usuarioService.salvarToken(resposta.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.mensagemErro = 'E-mail ou senha invalidos.';
      },
    });
  }
}
