import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritosideComponent } from './carritoside.component';

describe('CarritosideComponent', () => {
  let component: CarritosideComponent;
  let fixture: ComponentFixture<CarritosideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritosideComponent]
    });
    fixture = TestBed.createComponent(CarritosideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
