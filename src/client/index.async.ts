import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import Card from './components/Card';
import { IApp } from 'Types';

// ASYNC: Returns a promise that needs to be resolved
// In this case since the function doesnt return anything its ok
// Can also be done with generators
async function fetchData() {
  const response = await fetch('/data');
  const apps: IApp[] = await response.json();
  const availableHosts = getAllHosts(apps);

  availableHosts.forEach((host: string) => {
    const topSatisfiedApps = getAppsByHost(host, apps);
    const card = new Card(host, topSatisfiedApps);
    card.create();
  });
};

fetchData();
