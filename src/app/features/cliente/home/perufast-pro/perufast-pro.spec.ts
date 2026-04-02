import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerufastPro } from './perufast-pro';

describe('PerufastPro', () => {
  let component: PerufastPro;
  let fixture: ComponentFixture<PerufastPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerufastPro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerufastPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
