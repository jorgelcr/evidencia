import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEvidenciaComponent } from './crear-evidencia.component';

describe('CrearEvidenciaComponent', () => {
  let component: CrearEvidenciaComponent;
  let fixture: ComponentFixture<CrearEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEvidenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
