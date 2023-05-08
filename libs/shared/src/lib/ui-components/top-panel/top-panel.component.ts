import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { tabTree } from '../../constants/common.constants';
import { Tab } from '../../interfaces/common.interfaces';
import { GoogleService } from '../../services/google/google.service';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
  imports: [RouterModule, MatIconModule, CommonModule],
})
export class TopPanelComponent implements OnInit {
  protected readonly tabs: { [name: string]: Tab } = tabTree;

  protected isAuth = localStorage.getItem('googleToken');

  private readonly googleService = inject(GoogleService);
  private readonly router = inject(Router);

  private readonly interval = interval(1000);

  ngOnInit() {
    this.interval.pipe(untilDestroyed(this)).subscribe(() => {
      this.isAuth = localStorage.getItem('googleToken');
    });
  }

  protected revokeToken(): void {
    this.googleService.revokeToken();
    localStorage.removeItem('googleToken');
    this.router.navigate(['']);
  }
}
