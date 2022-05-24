import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ZeroCodeService } from '../zero-tables/services/zero-code.service';

@Component({
  selector: 'app-raw-query',
  templateUrl: './raw-query.component.html',
  styleUrls: ['./raw-query.component.scss'],
})
export class RawQueryComponent implements OnInit {
  rawFormGroup!: FormGroup;
  result!: FormControl;
  errorMessage!: string | undefined;

  constructor(
    private fb: FormBuilder,
    private zeroCodeService: ZeroCodeService
  ) {}

  ngOnInit(): void {
    this.rawFormGroup = this.fb.group({
      rawQueryStatement: this.fb.control('', Validators.required),
    });

    this.result = this.fb.control({ value: '', disabled: true });
  }

  executeQuery(form: { rawQueryStatement: string }) {
    this.zeroCodeService.executeQuery(form.rawQueryStatement).subscribe({
      error: (err) => {
        if (err.error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unknown Error';
        }
      },
      next: (res) => {
        this.result.setValue(JSON.stringify(res.content, null, 3));
      },
    });
  }
}
