import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize = 1;
  hide = true;

  nameTitle = '';
  optionTitle = '';
  amountTitle!: number;
  extraTitle = '';
  passwordTitle = '';

  form = { name: '', option: '', amount: 0, extra: '', password: '' };

  displayNameMap = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 3],
    [Breakpoints.Large, 4],
    [Breakpoints.XLarge, 5],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.currentScreenSize = this.changeCurrentScreenSize(result);
      });
  }

  changeCurrentScreenSize(result: BreakpointState) {
    for (const query of Object.keys(result.breakpoints)) {
      if (result.breakpoints[query]) {
        return this.displayNameMap.get(query) || 1;
      }
    }
    return 1;
  }

  logChange(e: Event) {
    console.log(e.target);
  }

  ngOnInit(): void {}

  executeForm(form: {
    name: string;
    option: string;
    amount: number;
    extra: string;
    password: string;
  }) {
    this.nameTitle = form.name;
    this.optionTitle = form.option;
    this.amountTitle = form.amount;
    this.extraTitle = form.extra;
    this.passwordTitle = form.password;
    return {
      nameTitle: this.nameTitle,
      optionTitle: this.optionTitle,
      amountTitle: this.amountTitle,
      extraTitle: this.extraTitle,
      passwordTitle: this.passwordTitle,
    };
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
