import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { GoogleService } from '@tattoo-manager/shared/services/google/google.service';
import {interval} from 'rxjs';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class LoginComponent implements OnInit {
  private isAuth = localStorage.getItem('googleToken');

  private readonly googleService = inject(GoogleService);
  private readonly router = inject(Router);

  private readonly interval = interval(1000);

  ngOnInit(): void {
    setTimeout(() => {
      this.googleService.initClient();
    }, 1000);

    if (this.isAuth) {
      this.router.navigate(['dashboard']);
    }
  }

  protected getToken(): void {
    this.googleService.getToken();
    this.interval.pipe(untilDestroyed(this)).subscribe(() => {
      this.isAuth = localStorage.getItem('googleToken');
      this.router.navigate(['dashboard']);
    });
  }
}
