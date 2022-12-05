import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../_services/auth.service';
import { registerComponentFields } from './registerForm.formly';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
	form!: FormGroup;
	model: any;
	fields: Array<FormlyFieldConfig>;
	// fields: FormlyFieldConfig[] = registerComponentFields;

	// form: any = {
	// 	userName: null,
	// 	password: null,
	// 	name: null,
	// 	lastName: null
	// };
	isSuccessful = false;
	isSignUpFailed = false;
	errorMessage = "";

	constructor(private authService: AuthService) {
		this.fields = registerComponentFields;
		this.model = { userName: '', password: '', name: '', lastName: '' };
		this.form = new FormGroup({});
	 }

	ngOnInit(): void {
	}

	onSubmit(): void {
		const { userName, password, name, lastName } = this.model;

		this.authService.register(userName, password, name, lastName).subscribe({
			next: data => {
				console.log("GEÇTİ");
				this.isSuccessful = true;
				this.isSignUpFailed = false;
			},
			error: err => {
				console.log(err.error);
				console.log("PATLADI");
				this.errorMessage = err.error;
				this.isSignUpFailed = true;
			}
		});
	}
}
