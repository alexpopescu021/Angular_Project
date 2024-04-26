import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedCryptoComponent } from './supported-crypto.component';

describe('SupportedCryptoComponent', () => {
  let component: SupportedCryptoComponent;
  let fixture: ComponentFixture<SupportedCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportedCryptoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportedCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
