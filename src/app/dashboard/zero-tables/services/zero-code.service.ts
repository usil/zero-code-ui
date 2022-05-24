import { Observable } from 'rxjs';
import { first } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ZeroCodeService {
  zeroCodeApi = environment.api + '/api';

  constructor(private http: HttpClient) {}
  goToSwagger(tableName: string) {
    window.open(this.zeroCodeApi + `/docs/#/${tableName}`);
  }

  executeQuery(dbQuery: string) {
    return this.http
      .post<QueryExecResult>(this.zeroCodeApi + '/zero-code/raw-query', {
        dbQuery,
      })
      .pipe(first());
  }

  getTables(): Observable<TablesResult> {
    return this.http
      .get<TablesResult>(this.zeroCodeApi + '/table')
      .pipe(first());
  }

  getFullTable(tableName: string): Observable<FullTableResult> {
    return this.http
      .get<FullTableResult>(this.zeroCodeApi + `/table/${tableName}`)
      .pipe(first());
  }

  queryTable(
    tableName: string,
    pageIndex: number,
    queryBody: { filters: any[] }
  ): Observable<QueryPaginationResult> {
    return this.http.post<QueryPaginationResult>(
      this.zeroCodeApi +
        `/${tableName}/query?pageIndex=${pageIndex}&&itemsPerPage=20`,
      { ...queryBody }
    );
  }

  refreshEndpoints() {
    return this.http
      .post(this.zeroCodeApi + `/zero-code/refresh`, {})
      .pipe(first());
  }

  getTable(
    tableName: string,
    pageIndex: number,
    orderType: string,
    orderByColumn: string
  ): Observable<QueryPaginationResult> {
    return this.http.get<QueryPaginationResult>(
      this.zeroCodeApi +
        `/${tableName}?pageIndex=${pageIndex}&&itemsPerPage=20&&orderByColumn=${orderByColumn}&&orderType=${orderType}`
    );
  }
}

interface QueryPaginationResult {
  message: string;
  code: number;
  content: QueryPaginationContent;
}

interface QueryExecResult {
  message: string;
  code: number;
  content: any;
}

interface QueryPaginationContent {
  items: any[];
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface TablesResult {
  message: string;
  code: number;
  content?: Table[];
}

interface FullTableResult {
  message: string;
  code: number;
  content: FullTable;
}

export interface Table {
  table_name: string;
  table_comment: string;
  table_schema: string;
}

export interface FullTable {
  table_name: string;
  table_comment: string;
  table_schema: string;
  columns: Column[];
}

export interface Column {
  column_name: string;
  column_default?: string;
  is_nullable: string;
  data_type: string;
  column_type: string;
  extra: string;
  column_comment: string;
  column_key: string;
  referenced_table_schema?: string;
  referenced_table_name?: string;
  referenced_column_name?: string;
}
