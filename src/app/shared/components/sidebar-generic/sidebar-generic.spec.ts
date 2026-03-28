import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGeneric } from './sidebar-generic';

describe('SidebarGeneric', () => {
  let component: SidebarGeneric;
  let fixture: ComponentFixture<SidebarGeneric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarGeneric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarGeneric);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
