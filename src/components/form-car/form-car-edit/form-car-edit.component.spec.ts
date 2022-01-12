import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormCarEditComponent } from "./form-car-edit.component";

describe("FormCarEditComponent", () => {
  let component: FormCarEditComponent;
  let fixture: ComponentFixture<FormCarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCarEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
