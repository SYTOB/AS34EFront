/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyPanelDataComponent } from './my-panel-data.component';

describe('MyPanelDataComponent', () => {
  let component: MyPanelDataComponent;
  let fixture: ComponentFixture<MyPanelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPanelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPanelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
