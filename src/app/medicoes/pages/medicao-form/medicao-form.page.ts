import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-medicao-form',
  templateUrl: './medicao-form.page.html',
  styleUrls: ['./medicao-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MedicaoFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
