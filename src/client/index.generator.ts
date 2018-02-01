import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import Card from './components/Card';
import { IApp } from 'Types';

// GENERATORS: The same can be accomplished with generators as well
run(function* fetchData() {
  const response = yield fetch('/data');
  const apps: IApp[] = yield response.json();
  const availableHosts = getAllHosts(apps);

  availableHosts.forEach((host: string) => {
    const topSatisfiedApps = getAppsByHost(host, apps);
    const card = new Card(host, topSatisfiedApps);
    card.create();
  });
});

function run(generator) {
  const iterator = generator();

  function iterate(iteration) {
    if (iteration.done) return iteration.value;
    const promise = iteration.value;
    return promise.then(res => iterate(iterator.next(res)));
  }
  // Can return this value if you want to call `.then()` on the `run()`
  iterate(iterator.next());
}
