import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
      ],
      providers: [AdminService]

    });
    service = TestBed.inject(AdminService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
