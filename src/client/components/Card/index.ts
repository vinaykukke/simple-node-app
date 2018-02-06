import { IApp } from 'Types';
import { IElementProps } from './types';

// https://stackoverflow.com/questions/40456231/typescript-module-augmentation-overwrites-the-original-module
// TYPESCRIPT MODULE AUGMENTATION: to overwrite the original module
// This is now in global scope, but you can declare modules as well
declare global {
  interface HTMLElement {
    removeAllClicks: (eventHandler: any) => void;
  }
}

// Extending the DOM is very bad practice.
// Refer: http://perfectionkills.com/whats-wrong-with-extending-the-dom/
HTMLElement.prototype.removeAllClicks = (eventHandler) => {
  this.removeEventListner('click', eventHandler)
}

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

  private createElement(props: IElementProps): HTMLElement {
    const { attributes, element } = props;
    const createdElement = document.createElement(element);

    for (let attr in attributes) {
      createdElement.setAttribute(attr, attributes[attr]);
    }

    return createdElement;
  }

  private createNodes() {
    const root = document.getElementById('root');
    const card = this.createElement({element: 'div', attributes: {class: 'card inline', id: 'card'}});
    const cardHeader = this.createElement({
      element: 'div',
      attributes: {
        class: 'card-header',
        innerHTML: this.hostName
      }
    });
    const cardBody = this.createElement({
      element: 'div',
      attributes: {
        class: 'card-body',
        id: `card-${this.hostName}`,
      }
    });
    const input = document.getElementById('input-checkbox');
    const eventHandler = () => {
      if ( card.className.indexOf('inline') !== -1 ) {
        card.className = card.className.replace('inline', '');
      } else {
        card.className += ' inline';
      }
    };

    // Remove any existing event listners

    // input.removeAllClicks(eventHandler);
    input.removeEventListener('click', eventHandler);
    input.addEventListener('click', eventHandler);

    card.appendChild(cardBody);
    card.insertBefore(cardHeader, cardBody);
    root.appendChild(card);
  }

  private fillNodes(app: IApp) {
    const cardBody = document.getElementById(`card-${this.hostName}`);
    const div = this.createElement({element: 'div'});
    const p1 = this.createElement({element: 'p', attributes: {class: 'apdex'}});
    const p2 = this.createElement({element: 'p', attributes: {class: 'app-name'}});

    div.appendChild(p1).innerHTML = app.apdex.toString();
    div.appendChild(p2).innerHTML = app.name;
    div.addEventListener('click', () => {
      alert(`Release Version: ${app.version}`);
    });
    cardBody.appendChild(div);
  }
}

export default Card;
