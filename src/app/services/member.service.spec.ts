import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MemberService } from './member.service';
describe('MemberService', () => {
  let service: MemberService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MemberService]
    });
    service = TestBed.inject(MemberService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
