/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiftItemComponent } from './gift-item.component';

describe('GiftItemComponent', () => {
  let component: GiftItemComponent;
  let fixture: ComponentFixture<GiftItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
