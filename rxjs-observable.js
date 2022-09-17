import { of, map, Observable } from 'rxjs';

of('World')
  .pipe(map((name) => `Hello 1 from test, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

callObservable = () => {
  observable.subscribe((d) => {
    console.log(d);
  });
};
