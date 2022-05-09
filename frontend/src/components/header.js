class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <style>
            .header {
                font-size: 50px;
                border-bottom: 20px solid rgb(125, 162, 218);
                color: rgb(125, 162, 218);
                margin-bottom: 21px;
                padding: 20px;
            }
        </style>
        
        <header class="header">
            Cool Image Gallery
        </header>
        `
    }
}

window.customElements.define('ce-header', Header);