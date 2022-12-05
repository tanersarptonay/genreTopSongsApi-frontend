import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../_services/favourite.service';
import { SearchService } from '../_services/search.service';
import { StorageService } from '../_services/storage.service';
import { PrimeNGConfig, SelectItemGroup } from "primeng/api";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
	form: any = {
    tag: null
  }
  songArray: Array<any> = [];
  errorMessage: string = ""; 
  active: number = -1;

	constructor (
    private searchService: SearchService, 
    private favouriteService: FavouriteService,
    private storageService: StorageService,
  ) {	}

  ngOnInit(): void {
    this.songArray = [];
  }

  onSubmit(): void {
    const { tag } = this.form;
    this.searchService.getSearchResults(tag).subscribe({
      next: data => {
        this.songArray = data;
      },
      error: err => {
        console.log(err.error);
        this.errorMessage = err.error;
      }
    });
  }

  onFavourite(songId: string, index: number): void {
    this.active = index;
    let user = this.storageService.getUser();
    this.favouriteService.setFavourite(songId, user.userName).subscribe({
      next: data => {
        console.log("Favourite added");
      },
      error: err => {
        console.log(err.error);
        console.log("Favourite not added, username: " + user.userName);
        this.errorMessage = err.error;
      }
    });
  }
}
