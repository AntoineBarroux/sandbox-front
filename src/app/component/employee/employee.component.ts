import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faDeleteLeft, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  protected readonly faEdit = faEdit;
  protected readonly faDeleteLeft = faDeleteLeft;
  protected readonly faTrash = faTrash;
}
