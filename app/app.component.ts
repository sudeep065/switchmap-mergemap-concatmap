import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgModel } from '@angular/forms';
import { concatMap, mergeMap, switchMap, map, take, delay } from 'rxjs/operators';
import 'rxjs/add/observable/from';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  switch$: Observable<string>;
  concat$: Observable<string>;
  merge$: Observable<string>;

  updateSearch(value) {
    this.searchString.next(value);
  }

  ngOnInit() {
    this.switch$ = this.searchString$.pipe(switchMap((x) => Observable
                  .from(['a','b','c'])
                  .pipe(
                    delay(1000),
                    map(y => `outer: ${x}, inner: ${y}`)
                  )
    ));

    this.concat$ = this.searchString$.pipe(concatMap((x) => Observable
                  .from(['a','b','c'])
                  .pipe(
                    delay(1000),
                    map(y => `outer: ${x}, inner: ${y}`)
                  )
    )); 
    
    this.merge$ = this.searchString$.pipe(mergeMap((x) => Observable
                  .from(['a','b','c'])
                  .pipe(
                    delay(1000),
                    map(y => `outer: ${x}, inner: ${y}`)
                  )
    ));
  } 
}
