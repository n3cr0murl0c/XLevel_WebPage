import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecompraayudaComponent } from './precompraayuda.component';

describe('PrecompraayudaComponent', () => {
  let component: PrecompraayudaComponent;
  let fixture: ComponentFixture<PrecompraayudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecompraayudaComponent]
    });
    fixture = TestBed.createComponent(PrecompraayudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
