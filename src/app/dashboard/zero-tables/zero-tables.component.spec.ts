import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroTablesComponent } from './zero-tables.component';

describe('ZeroTablesComponent', () => {
  let component: ZeroTablesComponent;
  let fixture: ComponentFixture<ZeroTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
