import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedCurrenciesComponent } from './supported-currencies.component';

describe('SupportedCurrenciesComponent', () => {
  let component: SupportedCurrenciesComponent;
  let fixture: ComponentFixture<SupportedCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedCurrenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportedCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
