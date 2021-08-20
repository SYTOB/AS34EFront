import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInterfaceComponent } from './courses-interface.component';

describe('CoursesInterfaceComponent', () => {
  let component: CoursesInterfaceComponent;
  let fixture: ComponentFixture<CoursesInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
