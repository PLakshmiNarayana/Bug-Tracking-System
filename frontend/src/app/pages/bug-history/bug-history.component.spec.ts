import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugHistoryComponent } from './bug-history.component';

describe('BugHistoryComponent', () => {

  let component: BugHistoryComponent;
  let fixture: ComponentFixture<BugHistoryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BugHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});