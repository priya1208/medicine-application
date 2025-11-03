import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService, Patient } from '../../services/patientservice';
import { Orderservice } from '../../services/orderservice';
@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  patient!: Patient | null;
  medicines: any[] = [];
  totalAmount = 0;

  constructor(
    private patientService: PatientService,
    private orderservice: Orderservice,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.patient = this.patientService.getCurrentPatient();


    this.medicines = [
      { name: 'Paracetamol 500mg', qty: 2, price: 30 },
      { name: 'Amoxicillin 250mg', qty: 1, price: 75 },
      { name: 'Cough Syrup 100ml', qty: 1, price: 60 },
    ];

    this.totalAmount = this.medicines.reduce(
      (sum, med) => sum + med.price * med.qty,
      0
    );
  }

  placeOrder(): void {
    if (!this.patient) {
      this.snack.open('Please add a patient first.', 'Close', { duration: 2000 });
      return;
    }

    const order = {
      patient: this.patient,
      medicines: this.medicines,
      total: this.totalAmount,
      date: new Date(),
    };
    this.orderservice.addMedicine({ id: '1', name: 'Paracetamol', price: 30, qty: 2 });
    this.orderservice.addMedicine({ id: '2', name: 'Cough Syrup', price: 60, qty: 1 });


    const meds = this.orderservice.getMedicines();
    this.orderservice.placeOrder(order).subscribe(() => {
      this.snack.open('✅ Order placed successfully!', 'Close', { duration: 2000 });
    });
  }

}
