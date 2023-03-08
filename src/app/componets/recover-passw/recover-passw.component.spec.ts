import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswComponent } from './recover-passw.component';

describe('RecoverPasswComponent', () => {
  let component: RecoverPasswComponent;
  let fixture: ComponentFixture<RecoverPasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverPasswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
