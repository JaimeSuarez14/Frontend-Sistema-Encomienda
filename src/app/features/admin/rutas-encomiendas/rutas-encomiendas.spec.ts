import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasEncomiendas } from './rutas-encomiendas';

describe('RutasEncomiendas', () => {
  let component: RutasEncomiendas;
  let fixture: ComponentFixture<RutasEncomiendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasEncomiendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasEncomiendas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
