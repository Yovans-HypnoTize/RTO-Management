import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriver } from './view-driver';

describe('ViewDriver', () => {
  let component: ViewDriver;
  let fixture: ComponentFixture<ViewDriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDriver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
