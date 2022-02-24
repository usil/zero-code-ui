import { Router } from '@angular/router';
import { LoginService } from './../login/service/login.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import routes from './routes';
import { environment } from 'src/environments/environment';
import {
  Column,
  Table,
  ZeroCodeService,
} from './zero-tables/services/zero-code.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  routesList = routes;
  title = environment.title;
  username: String;
  tablesPanelOpen = false;
  authPanelOpen = false;
  isAdminUser: boolean;
  tables: Table[] = [];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginService: LoginService,
    private zcService: ZeroCodeService,
    private router: Router
  ) {
    this.zcService.getTables().subscribe({
      next: (res) => {
        this.tables = res.content || [];
      },
    });
    this.isAdminUser = this.loginService.getRoles()?.indexOf('admin') !== -1;
    this.username = this.loginService.getUsername() || '';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
