import { IApp } from 'Types';
import { IDivProps, IHtmlElement } from './types';

class Card {
  private hostName: string;
  private apps: any[];

  constructor(host: string, apps: any[]) {
    this.hostName = host;
    this.apps = apps;
  }

  public create() {
    this.createNodes();

    // Complexity: O(n)
    for (let i = 0; i < this.apps.length; i++) {
      const app: IApp = this.apps[i];
      if (i > 5) break;
      this.fillNodes(app);
    }
  }

  private div(props: IDivProps): HTMLDivElement {
    const { className, id, text } = props;
    const div = document.createElement('div');

    className && div.setAttribute('class', className);
    id && div.setAttribute('id', id);
    text && (div.innerHTML = text);

    return div;
  }

  private createNodes() {
    const root = document.getElementById('root');
    const card = this.div({className: 'card inline', id: 'card'});
    const cardHeader = this.div({className: 'card-header'});
    const cardBody = this.div({className: 'card-body', id: `card-${this.hostName}`, text: this.hostName});
    const input = document.getElementById('input-checkbox');
    const eventHandler = () => {
      if ( card.className.indexOf('inline') !== -1 ) {
        card.className = card.className.replace('inline', '');
      } else {
        card.className += ' inline';
      }
    };

    // Remove any existing event listners
    input.removeEventListener('click', eventHandler);
    input.addEventListener('click', eventHandler);

    card.appendChild(cardBody);
    card.insertBefore(cardHeader, cardBody);
    root.appendChild(card);
  }

  private fillNodes(app: IApp) {
    const cardBody = document.getElementById(`card-${this.hostName}`);
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
}

export default Card;
