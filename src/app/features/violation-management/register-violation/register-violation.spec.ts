import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterViolation } from './register-violation';

describe('RegisterViolation', () => {
  let component: RegisterViolation;
  let fixture: ComponentFixture<RegisterViolation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterViolation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterViolation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
