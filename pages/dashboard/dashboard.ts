import { Component } from '@angular/core';
import { MedicineService } from '../../services/medicineservice';

import { Router } from '@angular/router';

import { Auth } from '../../services/auth';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  medicines: any[] = [];
  orderList: any[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private medicineService: MedicineService, private router: Router, private auth: Auth) { }

  ngOnInit(): void {
    this.loadMedicines('paracetamol');
  }

  loadMedicines(term: string = ''): void {
    if (!term.trim()) return;
    this.loading = true;
    this.medicineService.searchMedicines(term).subscribe({
      next: (res: any) => {
        this.medicines = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading medicines:', err);
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    this.loadMedicines(this.searchTerm);
  }

  addToOrder(med: any): void {
    if (!this.isAdded(med)) {
      this.orderList.push(med);
    }
  }

  removeFromOrder(med: any): void {
    this.orderList = this.orderList.filter(
      (m) => m.medicine_id !== med.medicine_id
    );
  }

  isAdded(med: any): boolean {
    return this.orderList.some((m) => m.medicine_id === med.medicine_id);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
