import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovatorRegistrationComponent } from './innovator-registration.component';

describe('InnovatorRegistrationComponent', () => {
  let component: InnovatorRegistrationComponent;
  let fixture: ComponentFixture<InnovatorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovatorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovatorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
