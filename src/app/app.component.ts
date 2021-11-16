import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'memoized-functions';

  // function that takes a function and returns a function
  memoize = (func) => {
    // a cache of results
    const results = {};
    // return a function for the cache of results
    return (...args) => {
      // a JSON key to save the results cache
      const argsKey = JSON.stringify(args);
      // execute `func` only if there is no cached value of clumsysquare()
      if (!results[argsKey]) {
        // store the return value of clumsysquare()
        results[argsKey] = func(...args);
      }
      // return the cached results
      return results[argsKey];
    };
  };

  square = num => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
      for (let j = 1; j <= num; j++) {
        result ++;
      }
    }
    return result;
  }

  memoizedSquare = this.memoize((num) => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
      for (let j = 1; j <= num; j++) {
        result++;
      }
    }
    return result;
  });

  ngOnInit() {
    // Normal function
    console.log("Normal function");
    console.time("First call");
    console.log(this.square(9467));
    console.timeEnd("First call");
    
    console.time("Second call");
    console.log(this.square(9467));
    console.timeEnd("Second call");
    
    console.time("Third call");
    console.log(this.square(9467));
    console.timeEnd("Third call");

    // Memoized function
    console.log("Memoized function");
    console.log(this.memoizedSquare(9467));
    console.timeEnd("First call");

    console.time("Second call");
    console.log(this.memoizedSquare(9467));
    console.timeEnd("Second call");

    console.time("Third call");
    console.log(this.memoizedSquare(9467));
    console.timeEnd("Third call");
  }

}
