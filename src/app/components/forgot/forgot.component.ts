import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { BooleanHelper } from "src/app/utilities/boolean.util";
import { NavHelperService } from "src/app/services/nav-helper.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.css"]
})
export class ForgotComponent {
  public email: string = null;

  public resetFailure = false;
  public showErrors = false;

  public get errors(): string[] {
    const myErrors = [];
    if (this.emailInvalid) {
      myErrors.push("Please provide an email.");
    }
    return myErrors;
  }

  public get valid(): boolean {
    return this.errors.length === 0;
  }

  private get emailInvalid(): boolean {
    return !BooleanHelper.hasValue(this.email);
  }

  constructor(
    private userService: UserService,
    private navHelper: NavHelperService,
  ) { }


  public submit() {
    this.showErrors = true;
    if (this.valid) {
      this.performReset();
    }
  }

  private performReset() {
    let response;
    this.userService.resetPasswordAutomatic(this.email)
      .subscribe((res) => response = res,
        (error) => {
          this.resetFailure = true;
        }, () => {
          this.navHelper.goToLogin();
        });
  }


}
