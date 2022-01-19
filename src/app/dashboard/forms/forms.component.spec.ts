import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { DashBoardMaterials } from '../material/material.module';
import { FormsComponent } from './forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Breakpoints } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let loader: HarnessLoader;
  let buttonHarness = MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardMaterials, BrowserAnimationsModule, FormsModule],
      declarations: [FormsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Change current screen size', () => {
    const scI = component.changeCurrentScreenSize({
      matches: true,
      breakpoints: { [Breakpoints.XSmall]: true },
    });
    expect(scI).toBe(1);

    const scII = component.changeCurrentScreenSize({
      matches: true,
      breakpoints: { [Breakpoints.Small]: true },
    });
    expect(scII).toBe(2);

    const scIII = component.changeCurrentScreenSize({
      matches: true,
      breakpoints: { [Breakpoints.Tablet]: true },
    });
    expect(scIII).toBe(1);
  });

  it('Puts title value', () => {
    const executeResult = component.executeForm({
      name: 'a name',
      option: 'an option',
      amount: 1,
      extra: 'an extra',
      password: 'an extra',
    });
    expect(executeResult).toEqual({
      nameTitle: 'a name',
      optionTitle: 'an option',
      amountTitle: 1,
      extraTitle: 'an extra',
      passwordTitle: 'an extra',
    });
  });

  it('Has submit button', async () => {
    const buttons = await loader.getAllHarnesses(
      buttonHarness.with({ text: 'Submit' })
    );
    expect(buttons.length).toBe(1);
  });

  it('Button shows titles on click', async () => {
    const titles = document.getElementById('result');
    expect(titles?.textContent?.trim()).toBe('|  |  |  |');
    const button = await loader.getHarness(
      buttonHarness.with({ text: 'Submit' })
    );
    await button.click();
    const titlesPostButton = document.getElementById('result');
    expect(titlesPostButton?.textContent?.trim()).toBe('|  | 0 |  |');
  });

  afterAll(() => {
    component.ngOnDestroy();
  });
});
