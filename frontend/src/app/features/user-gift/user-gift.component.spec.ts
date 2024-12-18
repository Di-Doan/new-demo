/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserGiftComponent } from './user-gift.component';

describe('UserGiftComponent', () => {
  let component: UserGiftComponent;
  let fixture: ComponentFixture<UserGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
