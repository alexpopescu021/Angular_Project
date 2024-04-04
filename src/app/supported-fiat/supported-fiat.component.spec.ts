import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedFiatComponent } from './supported-fiat.component';

describe('SupportedFiatComponent', () => {
  let component: SupportedFiatComponent;
  let fixture: ComponentFixture<SupportedFiatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportedFiatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportedFiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
