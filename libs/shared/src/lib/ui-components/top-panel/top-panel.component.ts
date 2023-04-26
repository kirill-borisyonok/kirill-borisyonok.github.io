import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {tabTree} from '../../constants/common.constants';
import {Tab} from '../../interfaces/common.interfaces';

@Component({
  standalone: true,
  selector: 'top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.scss'],
  imports: [RouterModule]
})
export class TopPanelComponent {
  protected readonly tabs: { [name: string]: Tab } = tabTree;
}
