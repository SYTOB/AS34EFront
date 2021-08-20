import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidCertificateComponent } from './valid-certificate.component';

describe('ValidCertificateComponent', () => {
  let component: ValidCertificateComponent;
  let fixture: ComponentFixture<ValidCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
