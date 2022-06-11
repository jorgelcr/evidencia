import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEvidenciasComponent } from './ver-evidencias.component';

describe('VerEvidenciasComponent', () => {
  let component: VerEvidenciasComponent;
  let fixture: ComponentFixture<VerEvidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEvidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
