import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SctX6NodeDecisionComponent } from './sct-x6-node-decision.component';

describe('SctX6NodeDecisionComponent', () => {
  let component: SctX6NodeDecisionComponent;
  let fixture: ComponentFixture<SctX6NodeDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SctX6NodeDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SctX6NodeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
