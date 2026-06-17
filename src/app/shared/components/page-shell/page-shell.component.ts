import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    AppHeaderComponent,
  ],
})
export class PageShellComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() eyebrow = '';
  @Input() showHeader = false;
  @Input() centered = false;
}
