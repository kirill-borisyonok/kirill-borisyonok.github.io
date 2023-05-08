import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {GoogleService} from '../../services/google.service';

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

  ngOnInit() {
    setTimeout(() => {
        this.googleService.initClient();
      }, 1000);
  }

  protected getToken(): void {
    this.googleService.getToken();
  }
}
