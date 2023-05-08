import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router} from '@angular/router';
import {GoogleService} from '@tattoo-manager/shared/services/google/google.service';

@Component({
  standalone: true,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class LoginComponent implements OnInit {
  private readonly googleService = inject(GoogleService);
  private readonly router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
        this.googleService.initClient();
      }, 1000);
  }

  protected getToken(): void {
    this.googleService.getToken();
  }
}
