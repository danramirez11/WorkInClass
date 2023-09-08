export enum Attribute {
    "name" = "name",
    "gender" = "gender",
    "born" = "born",
    "status" = "status",
    "photo" = "photo",
}

class Card extends HTMLElement {

    likeButton?: HTMLButtonElement;
    name?: string;
    gender?: string;
    born?: string;
    status?: string;
    photo?: string;

    static get observedAttributes (){
        const attrs: Record <Attribute, null> = {
            name: null,
            gender: null,
            born: null,
            status: null,
            photo: null,
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            default: 
            this[propName] = newValue;
            break;
        }
        
        this.render();
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.likeButton = document.createElement("button");
        this.likeButton.textContent = "Dar like";

        this.likeButton.addEventListener("click", () => {
        this.toggleLike();
        });

        

    this.render();
    }
    
    toggleLike() {
        if(this.likeButton){
        if (this.likeButton?.textContent === "Dar like") {
          this.likeButton.textContent = "Quitar like";
        } else {
          this.likeButton.textContent = "Dar like";
        }
      }
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if (this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./Card.css">
            <section>
            <h1>${this.name}</h1>
            <p>${this.gender}</p>
            <p>Born in ${this.born}</p>
            <p>Status: ${this.status}</p>
            <img src="${this.photo}">
            </section>`
            
            if(this.likeButton){this.shadowRoot.appendChild(this.likeButton)};
        }
    }
}

customElements.define("my-card", Card);
export default Card;