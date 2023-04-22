import { Component } from '@angular/core';
import { tabTree } from '@tattoo-manager/shared/constants/common.constants';
import { Tab } from '@tattoo-manager/shared/interfaces/common.interfaces';

@Component({
  standalone: true,
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
})
export class TopPanelComponent {
  protected readonly tabs: { [name: string]: Tab } = tabTree;
}
