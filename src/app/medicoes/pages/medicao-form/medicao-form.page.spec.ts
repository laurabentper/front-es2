import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicaoFormPage } from './medicao-form.page';

describe('MedicaoFormPage', () => {
  let component: MedicaoFormPage;
  let fixture: ComponentFixture<MedicaoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
