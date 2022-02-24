import { Column, FullTable } from './../services/zero-code.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.scss'],
})
export class MetaDataComponent implements OnInit {
  table: FullTable;
  columns: Column[] = [];

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()?.extras?.state === undefined) {
      const url = router.url;
      const urlSegmented = url.split('/');
      urlSegmented.pop();
      const parsedUrl = urlSegmented.join('/');
      router.navigate([parsedUrl]);
    }
    this.table = this.router.getCurrentNavigation()?.extras?.state as FullTable;
    this.columns = this.table.columns;
  }

  getPrimaryKey() {
    let primaryName = '';
    for (const column of this.columns) {
      if (column.column_key === 'PRI') {
        primaryName = column.column_name;
        break;
      }
    }
    return primaryName;
  }

  ngOnInit(): void {}
}
