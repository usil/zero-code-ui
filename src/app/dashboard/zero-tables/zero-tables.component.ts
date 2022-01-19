import {
  BehaviorSubject,
  catchError,
  map,
  merge,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullTable, ZeroCodeService } from './services/zero-code.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-zero-tables',
  templateUrl: './zero-tables.component.html',
  styleUrls: ['./zero-tables.component.scss'],
})
export class ZeroTablesComponent implements OnInit, OnDestroy {
  paramsSubscription!: Subscription;
  tableSubscription: Subscription;
  sortSubscription!: Subscription;
  dataSubscription!: Subscription;

  resultsLength = 0;

  errorMessage!: string | undefined;
  table$ = new BehaviorSubject<FullTable | undefined>(undefined);
  displayedColumns: string[] = [];
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zcService: ZeroCodeService,
    private router: Router
  ) {
    this.paramsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.table$.next(undefined);
        this.dataSource = [];
        this.displayedColumns = [];
        this.isLoadingResults = true;
        const tableName = param.get('tableName');
        this.zcService.getFullTable(tableName || '').subscribe({
          next: (res) => {
            this.displayedColumns = res.content.columns.map(
              (column) => column.column_name
            );
            this.table$.next(res.content);
          },
          error: (err) => {
            if (err.error) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Unknown Error';
            }
          },
        });
      },
    });

    this.tableSubscription = this.table$.subscribe((table) => {
      if (table === undefined) return;
      this.dataSubscription = merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.errorMessage = undefined;
            this.isLoadingResults = true;
            return this.zcService
              .queryTable(table.table_name, this.paginator.pageIndex, {
                filters: [],
              })
              .pipe(
                catchError((err) => {
                  if (err.error) {
                    this.errorMessage = err.error.message;
                  } else {
                    this.errorMessage = 'Unknown Error';
                  }
                  return of(null);
                })
              );
          }),
          map((data) => {
            this.isLoadingResults = false;
            if (data === null) {
              return [];
            }
            this.resultsLength = data.content?.totalItems || 0;
            return data.content.items || [];
          })
        )
        .subscribe((data) => {
          this.dataSource = data;
        });
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.sortSubscription?.unsubscribe();
    this.tableSubscription.unsubscribe();
    this.dataSubscription?.unsubscribe();
    this.table$.complete();
  }

  convertToDisplayInTable(variable: any, isDate = false) {
    if (isDate) {
      return new Date(variable).toLocaleDateString();
    }
    if (
      typeof variable === 'object' &&
      !Array.isArray(variable) &&
      variable !== null
    ) {
      return JSON.stringify(variable);
    }
    return variable;
  }

  goToMetaData() {
    this.router.navigate(['meta-data'], {
      relativeTo: this.activatedRoute,
      state: { ...this.table$.value },
    });
  }
  goToSwagger() {
    this.zcService.goToSwagger();
  }

  ngOnInit(): void {}
}
