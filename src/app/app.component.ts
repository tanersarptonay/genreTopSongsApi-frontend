import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Subscription } from 'rxjs';
import { EventBusService } from "./_shared/event-bus.service";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title: string = 'Genre Top Songs App';
	private roles: string[] = [];
	isLoggedIn = false;
	userName?: string;
	eventBusSub?: Subscription;

	constructor(private storageDevices: StorageService,
				private authService: AuthService,
				private eventBusService: EventBusService,
				private primengConfig: PrimeNGConfig) {	}

	ngOnInit(): void {
		this.isLoggedIn = this.storageDevices.isLoggedIn();
		this.primengConfig.ripple = true;

		if (this.isLoggedIn) {
			const user = this.storageDevices.getUser();
			this.roles = user.roles;

			this.userName = user.userName;
		}

		this.eventBusSub = this.eventBusService.on('logout', () => {
			this.logout();
		})
	}

	logout(): void {
		this.storageDevices.clean();
		this.isLoggedIn = false;
	}
}
