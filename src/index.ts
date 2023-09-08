import * as components from "./components/export";
import { cardsData } from "./data/data";
import Card, { Attribute } from "./components/Card/Card";

class AppContainer extends HTMLElement {

    cards: Card[] = []

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        cardsData.forEach((character) => {
            const card = this.ownerDocument.createElement("my-card") as Card;
            card.setAttribute(Attribute.name, String(character.name));
            card.setAttribute(Attribute.gender, String(character.gender));
            card.setAttribute(Attribute.born, String(character.born));
            card.setAttribute(Attribute.status, String(character.status));
            card.setAttribute(Attribute.photo, String(character.photo));
            this.cards.push(card);
        })
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.cards.forEach((card) => {
                this.shadowRoot?.appendChild(card)
            })
        }
    }
}

customElements.define("app-container", AppContainer);
