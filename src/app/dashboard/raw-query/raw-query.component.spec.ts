import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawQueryComponent } from './raw-query.component';

describe('RawQueryComponent', () => {
  let component: RawQueryComponent;
  let fixture: ComponentFixture<RawQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RawQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
