import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, effect, EventEmitter, input, Output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee.model';
import {Supervisor} from '../../model/supervisor.model';
import {SupervisorService} from '../../service/supervisor.service';
import {EmployeeForm} from './employee.form';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    DropdownModule,
    AsyncPipe,
    ReactiveFormsModule,
    JsonPipe
  ],
  providers: [SupervisorService],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss'
})
export class FormEmployeeComponent {

  @Output()
  public readonly cancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public readonly save: EventEmitter<EmployeeForm> = new EventEmitter<EmployeeForm>();

  public readonly employee: Signal<Employee> = input<Employee>();

  public readonly supervisors$: Observable<Supervisor[]>;

  public readonly form: FormGroup;

  public constructor(supervisorService: SupervisorService,
                     formBuilder: FormBuilder) {
    this.supervisors$ = supervisorService.getSupervisors$();

    effect(() => {
      if (this.employee()) {
        this.form.patchValue({
          id: this.employee().id,
          firstName: this.employee().firstName,
          lastName: this.employee().lastName,
          position: this.employee().position,
          supervisor: this.employee().supervisor?.id ?? ''
        });
      }
    }, {
      allowSignalWrites: true
    });

    this.form = formBuilder.group({
      id: formBuilder.control(''),
      firstName: formBuilder.control('', Validators.required),
      lastName: formBuilder.control('', Validators.required),
      position: formBuilder.control('', Validators.required),
      supervisor: formBuilder.control(''),
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }

  public onCancel(): void {
    this.form.reset();
    this.cancel.emit();
  }
}
