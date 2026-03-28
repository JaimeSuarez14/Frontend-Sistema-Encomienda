import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUi } from './button-ui';

describe('ButtonUi', () => {
  let component: ButtonUi;
  let fixture: ComponentFixture<ButtonUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
