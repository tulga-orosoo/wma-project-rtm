import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViewComponent } from './update-view.component';

describe('UpdateViewComponent', () => {
  let component: UpdateViewComponent;
  let fixture: ComponentFixture<UpdateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
