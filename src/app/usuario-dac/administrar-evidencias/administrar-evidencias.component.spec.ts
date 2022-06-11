import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEvidenciasComponent } from './administrar-evidencias.component';

describe('AdministrarEvidenciasComponent', () => {
  let component: AdministrarEvidenciasComponent;
  let fixture: ComponentFixture<AdministrarEvidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarEvidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
