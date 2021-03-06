import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import Card from './components/Card';
import { IApp } from 'Types';

// REGULAR: The regular way of doing it.
fetch('/data').then(res => res.json()).then((apps: IApp[]) => {
  // Complexity: O(n^2)
  const availableHosts = getAllHosts(apps);

  // Complexity: O(n)
  availableHosts.forEach((host: string) => {
    // Make a new card for every host
    // Complexity: O(n^2) + O(n log(n)).
    const topSatisfiedApps = getAppsByHost(host, apps);
    const card = new Card(host, topSatisfiedApps);
    // Complexity: O(n), because it uses `topSatisfiedApps`
    card.create();
  });
});
