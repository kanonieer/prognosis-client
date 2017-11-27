import { TestBed, inject } from '@angular/core/testing';

import { GroupCostPerMonthService } from './group-cost-per-month.service';

describe('GroupCostPerMonthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupCostPerMonthService]
    });
  });

  it('should be created', inject([GroupCostPerMonthService], (service: GroupCostPerMonthService) => {
    expect(service).toBeTruthy();
  }));
});
