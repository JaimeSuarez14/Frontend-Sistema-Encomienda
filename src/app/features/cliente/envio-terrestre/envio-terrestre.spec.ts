import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioTerrestre } from './envio-terrestre';

describe('EnvioTerrestre', () => {
  let component: EnvioTerrestre;
  let fixture: ComponentFixture<EnvioTerrestre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioTerrestre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioTerrestre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
