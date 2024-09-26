import {DatePipe, JsonPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Employee} from '../../model/employee.model';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FaIconComponent,
    JsonPipe,
    DatePipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;

  @Input({required: true})
  public employee: Employee;

  @Output()
  public readonly edit: EventEmitter<void> = new EventEmitter<void>();

  private readonly employeeService: EmployeeService = inject(EmployeeService);

  public deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe();
  }
}
