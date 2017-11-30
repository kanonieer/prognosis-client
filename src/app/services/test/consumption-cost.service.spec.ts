import { TestBed, inject } from '@angular/core/testing';

import { ConsumptionCostService } from './consumption-cost.service';

describe('ConsumptionCostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumptionCostService]
    });
  });

  it('should be created', inject([ConsumptionCostService], (service: ConsumptionCostService) => {
    expect(service).toBeTruthy();
  }));
});
