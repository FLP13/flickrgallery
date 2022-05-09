class Gallery extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this._images = [];
        this._loading = false;
        this._currentPage = 1;
    }

    get images() { return this._images; }
    set images(value) { this._images = value; }
    
    get loading() { return this._loading; }
    set loading(value) { this._loading = value; }

    get currentPage() { return this._currentPage; }
    set currentPage(value) { this._currentPage = value; }

    onClickImage(imageId, action) {
        const imageInfoElement = this.shadow.querySelector(`#image-info-${imageId}`);
        if (action === 'show') imageInfoElement.classList.add('image-info--visible');
        else imageInfoElement.classList.remove('image-info--visible');
    }

    setup() {
        this.render();
        let imageElements = this.shadow.querySelectorAll('.image');
        imageElements.forEach((imageElement, id) => {
            imageElement.addEventListener('mouseenter', this.onClickImage.bind(this, id, 'show'));
        });
        let imageInfoElements = this.shadow.querySelectorAll('.image-info');
        imageInfoElements.forEach((imageInfoElement, id) => {
            imageInfoElement.addEventListener('mouseleave', this.onClickImage.bind(this, id, ''));
        });
    }

    async connectedCallback() {
        this.loading = true;
        this.setup();

        const imageData = await (await fetch(`http://localhost:8081/getgallery/${this.currentPage}`)).json();
        this.images = imageData;
        this.loading = false;
        this.setup();

       window.addEventListener('scroll',async (event) => {
            
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.loading = true;
                this.setup();

                this.currentPage = this.currentPage + 1;
                const imageData = await (await fetch(`http://localhost:8081/getgallery/${this.currentPage}`)).json();
                this.images = this.images.concat(imageData);
                this.loading = false;
                this.setup();
             }
        });
    }

    renderImages() {
        if (!!this.images && this.images.length > 0) {
            return (
                this.images.map((image, id) => {
                    return `
                        <style>
                        .image-wrapper {
                            position: relative;
                        }

                        .image {
                            width: 300px;
                            height: 300px;
                            margin: 5px;
                            object-fit: cover;
                        }

                        .image-info {
                            display: none;
                            cursor: pointer;
                        }

                        .image-title {
                            text-align: center;
                            padding: 10px;
                            white-space: normal;
                        }

                        .image-info--visible {
                            position: absolute;
                            top: 0;
                            background: #ffffff7d;
                            margin: 5px;
                            width: 300px;
                            height: 300px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        </style>
                        <div class="image-wrapper">
                            <img class="image" src="${image.url}">
                            <div class="image-info" id="image-info-${id}">
                                <p class="image-title">
                                    ${image.title}
                                <p>
                            </div>
                        </div>
                        
                    `
                }).join('')
            )
        };
        return '';
    }

    renderLoader() {
        if (this.loading) {
            return `
                <style>
                    .skeleton-wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        padding-bottom: 200px;
                        max-width: 1200px;
                        align-self: center;
                    }
                    
                    .skeleton-image {
                        width: 300px;
                        height: 300px;
                        margin: 5px;
                        background: linear-gradient(
                            to right,
                            rgba(255, 255, 255, 0),
                            rgba(255, 255, 255, 0.5) 50%,
                            rgba(255, 255, 255, 0) 80%
                          ),
                          lightgray;
                        background-repeat: repeat-y;
                        background-size: 50px 200px;
                        background-position: 0 0;    
                        animation: shine 1s infinite;
                    }

                    @keyframes shine {
                      to {
                        background-position: 100% 0, /* move highlight to right */ 0 0;
                      }
                    }
                </style>

                <div class="skeleton-wrapper">
                    ${[...Array(12)].map((_, i) => {
                        return `
                            <div class="skeleton-image"></div>
                        `
                    }).join('')}
                </div>
            `
        } else {
            return '';
        }
    }

    render() {
        this.shadow.innerHTML = `
        <style>
            .gallery-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .gallery {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                max-width: 1200px;
                align-self: center;
            }
        </style>
        
        <div class="gallery-wrapper">
            <div class="gallery">
                ${this.renderImages()}
            </div>
            ${this.renderLoader()}
        </div>
        `
    }
}

window.customElements.define('ce-gallery', Gallery);