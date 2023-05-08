import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { GoogleSheetService } from '../../services/google-sheet.service';
import { GoogleService } from '../../services/google.service';
import { StepNames } from './entities/dashboard.constants';

@UntilDestroy()
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
    MatAutocompleteModule,
    CommonModule
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
export class DashboardComponent implements OnInit {
  protected readonly stepNames = StepNames;
  protected readonly btnName = 'Сохранить';

  protected cities!: string[];
  protected names!: string[];
  protected sources!: string[];
  protected status!: string[];

  protected filteredSources!: Observable<string[]>;
  protected filteredNames!: Observable<string[]>;
  protected filteredStatus!: Observable<string[]>;
  protected filteredCities!: Observable<string[]>;

  // DI
  private readonly formBuilder = inject(FormBuilder);
  private readonly googleService = inject(GoogleService);
  private readonly googleSheetService = inject(GoogleSheetService);

  // Form build
  protected applicationDateFormGroup: FormGroup = this.formBuilder.group({
    applicationDate: [moment()],
  });
  protected nameFormGroup: FormGroup = this.formBuilder.group({ name: [''] });
  protected maleFormGroup: FormGroup = this.formBuilder.group({
    male: ['Мужской'],
  });
  protected sessionDateFormGroup: FormGroup = this.formBuilder.group({
    sessionDate: [moment()],
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

  ngOnInit(): void {
    setTimeout(() => {
      this.googleService.initClient();
    }, 1000);

    this.googleSheetService.loadSheet().pipe(untilDestroyed(this)).subscribe((item) => {
      this.cities = [...new Set(item.map((el) => el[this.stepNames.City]))].filter((item) => item);
      this.names = [...new Set(item.map((el) => el[this.stepNames.Name]))].filter((item) => item);
      this.sources = [...new Set(item.map((el) => el[this.stepNames.Source]))].filter((item) => item);
      this.status = [...new Set(item.map((el) => el[this.stepNames.Status]))].filter((item) => item);

      this.filteredSources = this.sourceFormGroup.controls.source.valueChanges.pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => this.filterSources(value || '')),
      );

      this.filteredNames = this.nameFormGroup.controls.name.valueChanges.pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => this.filterSources(value || '')),
      )

      this.filteredStatus = this.statusFormGroup.controls.status.valueChanges.pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => this.filterSources(value || '')),
      )

      this.filteredCities = this.cityFormGroup.controls.city.valueChanges.pipe(
        untilDestroyed(this),
        startWith(''),
        map(value => this.filterSources(value || '')),
      )
    });
  }

  protected getToken(): void {
    this.googleService.getToken();
  }

  protected revokeToken(): void {
    this.googleService.revokeToken();
  }

  protected save(): void {
    this.googleSheetService
      .addNewValue()
      .subscribe((item) => console.log(item));
  }

  private filterSources(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sources.filter(option => option.toLowerCase().includes(filterValue));
  }
}
