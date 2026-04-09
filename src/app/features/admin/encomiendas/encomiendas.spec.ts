import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encomiendas } from './encomiendas';

describe('Encomiendas', () => {
  let component: Encomiendas;
  let fixture: ComponentFixture<Encomiendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Encomiendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Encomiendas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
