import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import Card from './components/Card/index.factories.example';
import { IApp } from 'Types';

fetch('/data').then(res => res.json()).then((apps: IApp[]) => {
  const availableHosts = getAllHosts(apps);
  
  availableHosts.forEach((host: string) => {
    const topSatisfiedApps = getAppsByHost(host, apps);
    const card = Card(host, topSatisfiedApps);
    card.create();
  });
});
