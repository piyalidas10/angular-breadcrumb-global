import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <section>
      <h1>Admin Dashboard</h1>
      <p>Restricted area. Admin access only.</p>
    </section>
  `
})
export class AdminComponent {}
