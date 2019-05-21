import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiViewComponent } from './multi-view.component';

describe('MultiViewComponent', () => {
  let component: MultiViewComponent;
  let fixture: ComponentFixture<MultiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
