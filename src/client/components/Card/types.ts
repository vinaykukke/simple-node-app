export interface IDivProps {
  className?: string;
  id?: string;
  text?: string;
}

export interface IHtmlElement extends HTMLElement {
  prototype: {
    removeAllClicks: (eventHandler: any) => void;
  }
}
