import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadBuildComponent } from './upload-build.component';

describe('UploadBuildComponent', () => {

  let component: UploadBuildComponent;
  let fixture: ComponentFixture<UploadBuildComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [UploadBuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});