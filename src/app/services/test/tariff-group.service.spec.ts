import { TestBed, inject } from '@angular/core/testing';

import { TariffGroupService } from './tariff-group.service';

describe('TariffGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TariffGroupService]
    });
  });

  it('should be created', inject([TariffGroupService], (service: TariffGroupService) => {
    expect(service).toBeTruthy();
  }));
});
