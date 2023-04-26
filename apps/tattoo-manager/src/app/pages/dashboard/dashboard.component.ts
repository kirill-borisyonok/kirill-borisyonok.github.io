import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StepNames } from './entities/dashboard.constants';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';

@Component({
  standalone: true,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class DashboardComponent {
  protected readonly stepNames = StepNames;
  protected readonly btnName = 'Сохранить';

  protected applicationDateFormGroup: FormGroup = this.formBuilder.group({
    applicationDate: [''],
  });
  protected nameFormGroup: FormGroup = this.formBuilder.group({ name: [''] });
  protected maleFormGroup: FormGroup = this.formBuilder.group({
    male: ['Мужской'],
  });
  protected sessionDateFormGroup: FormGroup = this.formBuilder.group({
    sessionDate: [''],
  });
  protected linkFormGroup: FormGroup = this.formBuilder.group({ link: [''] });
  protected sourceFormGroup: FormGroup = this.formBuilder.group({
    source: [''],
  });
  protected phoneFormGroup: FormGroup = this.formBuilder.group({ phone: [''] });
  protected sketchFormGroup: FormGroup = this.formBuilder.group({
    sketch: [''],
  });
  protected paymentMadeFormGroup: FormGroup = this.formBuilder.group({
    paymentMade: [''],
  });
  protected paymentFormGroup: FormGroup = this.formBuilder.group({
    payment: [''],
  });
  protected statusFormGroup: FormGroup = this.formBuilder.group({
    status: [''],
  });
  protected cityFormGroup: FormGroup = this.formBuilder.group({ city: [''] });
  protected commentFormGroup: FormGroup = this.formBuilder.group({
    comment: [''],
  });

  protected male = new FormControl('Мужской');
  characters$: any;

  constructor(
    private formBuilder: FormBuilder,
    private googleSheetsDbService: GoogleSheetsDbService
  ) {}

  attributesMapping = {
    id: 'Дата обращения',
    name: 'ФИО',
    email: 'Пол',
    contact: 'Дата сеанса',
    link: 'Ссылка'
  };

  protected save(): void {}

  ngOnInit() {
    this.male.valueChanges.subscribe((item) => console.log(item));
    this.characters$ = this.googleSheetsDbService
      .get(
        '16VkFH-YVB0iSkebBJmQVeFwzBnN7uHk4AWpw-j5D2TY',
        'Characters',
        this.attributesMapping
      )
      .subscribe((item) => console.log(item));
  }
}
