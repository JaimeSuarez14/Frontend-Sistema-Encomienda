import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosTerrestre } from './pasos-terrestre';

describe('PasosTerrestre', () => {
  let component: PasosTerrestre;
  let fixture: ComponentFixture<PasosTerrestre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasosTerrestre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasosTerrestre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
