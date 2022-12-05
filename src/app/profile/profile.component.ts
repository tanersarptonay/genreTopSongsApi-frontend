import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteService } from '../_services/favourite.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	currentUser: any;
	songArray: Array<any> = [];
	errorMessage: string = "";
	
	constructor (
		private storageService: StorageService,
		private favouriteService: FavouriteService
	) { }
	
	ngOnInit(): void {
		this.currentUser = this.storageService.getUser();
		this.favouriteService.getFavourites(this.currentUser.userName).subscribe({
			next: data => {
				this.songArray = data;
			},
			error: err => {
				console.log(err.error);
				this.errorMessage = err.error;
			}
		})
	}

	onClickedDelete(songId: string) {
		this.favouriteService.deleteFavourite(songId, this.currentUser.userName).subscribe({
			next: data => {
				console.log("SİLDİ\n");
				this.ngOnInit();
			},
			error: err => {
				console.log(err.error);
				this.errorMessage = err.error;
			}
		})
	}
}
