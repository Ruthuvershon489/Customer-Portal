import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredDebComponent } from './cred-deb.component';

describe('CredDebComponent', () => {
  let component: CredDebComponent;
  let fixture: ComponentFixture<CredDebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredDebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredDebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
