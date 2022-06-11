import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodasEvidenciasComponent } from './ver-todas-evidencias.component';

describe('VerTodasEvidenciasComponent', () => {
  let component: VerTodasEvidenciasComponent;
  let fixture: ComponentFixture<VerTodasEvidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTodasEvidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTodasEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
