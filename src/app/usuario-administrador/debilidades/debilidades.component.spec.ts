import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebilidadesComponent } from './debilidades.component';

describe('DebilidadesComponent', () => {
  let component: DebilidadesComponent;
  let fixture: ComponentFixture<DebilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebilidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
