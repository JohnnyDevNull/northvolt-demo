import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerHelloComponent } from './server-hello.component';

describe('ServerHelloComponent', () => {
  let component: ServerHelloComponent;
  let fixture: ComponentFixture<ServerHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerHelloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
