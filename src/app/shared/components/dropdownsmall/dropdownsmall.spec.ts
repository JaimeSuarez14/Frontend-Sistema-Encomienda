import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdownsmall } from './dropdownsmall';

describe('Dropdownsmall', () => {
  let component: Dropdownsmall;
  let fixture: ComponentFixture<Dropdownsmall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dropdownsmall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dropdownsmall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
