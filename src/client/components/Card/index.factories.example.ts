import { IApp } from 'Types';

const Card = (host: string, apps: any[]) => {
  const createNodes = () => {
    const root = document.getElementById('root');
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const input = document.getElementById('input-checkbox');
    const eventHandler = () => {
      if ( card.className.indexOf('inline') !== -1 ) {
        card.className = card.className.replace('inline', '');
      } else {
        card.className += ' inline';
      }
    };

    card.className = 'card inline';
    card.id = 'card';
    cardHeader.className = 'card-header';
    cardBody.className = 'card-body';
    cardBody.id = `card-${host}`;
    cardHeader.innerHTML = host;

    // Remove any existing event listners
    input.removeEventListener('click', eventHandler);
    input.addEventListener('click', eventHandler);

    card.appendChild(cardBody);
    card.insertBefore(cardHeader, cardBody);
    root.appendChild(card);
  }

  const fillNodes = (app: IApp) => {
    const cardBody = document.getElementById(`card-${host}`);
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.className = 'apdex';
    p2.className = 'app-name';

    div.appendChild(p1).innerHTML = app.apdex.toString();
    div.appendChild(p2).innerHTML = app.name;
    div.addEventListener('click', () => {
      alert(`Release Version: ${app.version}`);
    });
    cardBody.appendChild(div);
  }

  return {
    create: () => {
      createNodes();
      
      for (let i = 0; i < apps.length; i++) {
        const app: IApp = apps[i];
        if (i > 5) break;
        fillNodes(app);
      }
    }
  };
}

export default Card;
