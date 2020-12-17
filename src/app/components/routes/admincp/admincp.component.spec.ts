import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincpComponent } from './admincp.component';

describe('AdmincpComponent', () => {
  let component: AdmincpComponent;
  let fixture: ComponentFixture<AdmincpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
