import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PatientService } from '../../services/patientservice';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addpatient',
  standalone: false,
  templateUrl: './addpatient.html',
  styleUrls: ['./addpatient.css'],
})
export class Addpatient implements OnInit {
  patientForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.patientForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      zipcode: [''],
      dob: [''],
      gender: [''],
      blood_group: [''],
    });
  }

  onSubmit(): void {
  console.log('Submit clicked'); // ✅ Add this

  if (this.patientForm.invalid) {
    console.log('Form invalid:', this.patientForm.value);
    return;
  }

  this.patientService.savePatient(this.patientForm.value).subscribe({
    next: () => {
      this.snack.open('Patient saved successfully ✅', 'Close', { duration: 2000 });
      this.patientForm.reset();
    },
    error: (err) => {
      console.error('Error saving patient:', err);
      this.snack.open('Failed to save patient ❌', 'Close', { duration: 2000 });
    },
  });
}

}
