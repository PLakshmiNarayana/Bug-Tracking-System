import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsList } from './builds-list.component';

describe('BuildsList', () => {
  let component: BuildsList;
  let fixture: ComponentFixture<BuildsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
