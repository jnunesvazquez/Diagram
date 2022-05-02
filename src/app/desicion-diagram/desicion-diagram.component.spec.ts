import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesicionDiagramComponent } from './desicion-diagram.component';

describe('DesicionDiagramComponent', () => {
  let component: DesicionDiagramComponent;
  let fixture: ComponentFixture<DesicionDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesicionDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesicionDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
