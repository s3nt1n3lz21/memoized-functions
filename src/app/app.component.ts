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

  // Memoization is good for recursive functions
  // fibonacci(5) = fibonacci(4) + fibonacci(3);
  // fibonacci(5) = fibonacci(3) + fibonacci(2) + fibonacci(2) + fibonacci(1);
  // fibonacci(5) = fibonacci(2) + fibonacci(1) + fibonacci(2) + fibonacci(2) + fibonacci(1);
  // We end up calling the function with the same input many times
  // So we just store the result for the next time we want it.

  fibonacci = (n) => {
    // if n is equal to 1, return the first term 1
    if (n == 1) {
      return 1;
    }
    // if n is equal 2, return the second term 1
    else if (n == 2) {
      return 1;
    }

    // else n is greater than two, return the sum of the previous two terms
    else 
      return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  };

  memoizedFibonacci = this.memoize((n) => {
    // if n is equal to 1 return the first term 1
    if (n == 1) {
      return 1;
    }
    // if n is equal 2 1 return the second term 1
    else if (n == 2) {
      return 1;
    }
  
    // else n is larger than two, return the sum of the previous two terms
    else 
    return this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
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

    // Recursive functions
    console.time("Normal Fibonacci function");
    console.log(this.fibonacci(40));
    console.timeEnd("Normal Fibonacci function");

    console.time("Memoized Fibonacci function");
    console.log(this.memoizedFibonacci(40));
    console.timeEnd("Memoized Fibonacci function");
  }

}
