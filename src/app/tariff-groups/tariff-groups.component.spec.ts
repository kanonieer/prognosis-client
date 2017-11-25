import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffGroupsComponent } from './tariff-groups.component';

describe('TariffGroupsComponent', () => {
  let component: TariffGroupsComponent;
  let fixture: ComponentFixture<TariffGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TariffGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
