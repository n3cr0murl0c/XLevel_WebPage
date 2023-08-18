import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav3Component } from './nav3.component';

describe('Nav3Component', () => {
  let component: Nav3Component;
  let fixture: ComponentFixture<Nav3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Nav3Component]
    });
    fixture = TestBed.createComponent(Nav3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
