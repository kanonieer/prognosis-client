import { TestBed, inject } from '@angular/core/testing';

import { ConsumptionService } from './consumption.service';

describe('ConsumptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumptionService]
    });
  });

  it('should be created', inject([ConsumptionService], (service: ConsumptionService) => {
    expect(service).toBeTruthy();
  }));
});
