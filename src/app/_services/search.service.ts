import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = "http://localhost:8080/api/v1/"

const httpOptions = {
	headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private http: HttpClient) { }

	getSearchResults(tag: string): Observable<any> {
		return this.http.post(
			API_URL + "search",
			{
				tag,
			},
			httpOptions
		)
	}

	getSong(songId: string): Observable<any> {
		let params = new HttpParams().set("songId", songId);
		return this.http.get(
			API_URL + "db" + "/getsong",
			{
				headers: new HttpHeaders({"Content-Type": "application/json"}),
				params: params
			}
		)
	}
}
