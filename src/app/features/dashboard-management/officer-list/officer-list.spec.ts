import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerList } from './officer-list';

describe('OfficerList', () => {
  let component: OfficerList;
  let fixture: ComponentFixture<OfficerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
