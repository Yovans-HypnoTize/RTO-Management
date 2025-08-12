import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Violation } from './violation';

describe('Violation', () => {
  let component: Violation;
  let fixture: ComponentFixture<Violation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Violation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Violation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
