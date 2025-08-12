import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tax } from './tax';

describe('Tax', () => {
  let component: Tax;
  let fixture: ComponentFixture<Tax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tax);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
