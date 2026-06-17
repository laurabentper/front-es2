import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  IonButton,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonHeader,
    IonToolbar,
    IonButton,
  ],
})
export class AppHeaderComponent {}
