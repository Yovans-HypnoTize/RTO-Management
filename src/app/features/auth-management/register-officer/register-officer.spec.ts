import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOfficer } from './register-officer';

describe('RegisterOfficer', () => {
  let component: RegisterOfficer;
  let fixture: ComponentFixture<RegisterOfficer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOfficer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOfficer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
