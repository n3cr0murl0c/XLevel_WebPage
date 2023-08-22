import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioclienteComponent } from './serviciocliente.component';

describe('ServicioclienteComponent', () => {
  let component: ServicioclienteComponent;
  let fixture: ComponentFixture<ServicioclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioclienteComponent]
    });
    fixture = TestBed.createComponent(ServicioclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
