import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposRegistrosComponent } from './tipos-registros.component';

describe('TiposRegistrosComponent', () => {
  let component: TiposRegistrosComponent;
  let fixture: ComponentFixture<TiposRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
