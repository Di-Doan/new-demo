import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  contactError!: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      note: ['']
    })
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      this.contactError = "Đã có lỗi xảy ra. Vui lòng thử lại."
      return
    }

    this.contactError = ""
    return
  }

}
