import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicle } from './view-vehicle';

describe('ViewVehicle', () => {
  let component: ViewVehicle;
  let fixture: ComponentFixture<ViewVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVehicle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
