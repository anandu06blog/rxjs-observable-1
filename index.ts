import './style.css';

import { interval, take, throwError } from 'rxjs';
import { of, map, Observable } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';

of('World')
  .pipe(map((name) => `Hello 1, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    // subscriber.complete();
  }, 1000);
});

observable.subscribe((d) => {
  console.log(d);
});

const source$ = interval(1000).pipe(take(4));

async function getTotal() {
  let total = 0;

  await source$.forEach((value) => {
    total += value;
    console.log('observable -> ' + value);
    if (value === 1) {
      throw new Error('Dae first value');
    }
  });

  return total;
}

source$.subscribe({
  next(x) {
    console.log('next', x);
  },
  complete() {
    console.log('completed source$');
  },
  error(e) {
    console.error();
  },
});

getTotal()
  .then((total) => console.log('Total: ' + total))
  .catch(console.error);

// Expected:
// 'observable -> 0'
// 'observable -> 1'
// 'observable -> 2'
// 'observable -> 3'
// 'Total: 6'
