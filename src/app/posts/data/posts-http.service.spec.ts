import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environment';
import { PostsHttpService } from './posts-http.service';

describe(PostsHttpService.name, () => {
  let http: HttpTestingController;
  let service: PostsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PostsHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PostsHttpService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts with GET', () => {
    service.getAllPosts().subscribe();
    const req = http.expectOne(environment.apiBaseUrl + '/posts');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
