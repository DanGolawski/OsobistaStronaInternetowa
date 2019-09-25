class portfolioElement {
    constructor(title, link, description, imgurl, url, techList) {
        this.title = title;
        this.link = link;
        this.imageUrl = imgurl;
        this.description = description;
        this.techList = techList;
        this.url = url;
    }

    createHTMLelement() {
        let HTMLelem = `<div class="poster"><img
                src=${this.imageUrl}>
        </div>
        <div class="details">
            <h2>${this.title}<br>
                <a href="${this.url}"><span>${this.link}</span></a>
            </h2>
            <div class="tags">
                ${this.createList()}
            </div>
            <div class="info">
                <p>${this.description}</p>
            </div>
        </div>`
        return HTMLelem;
    }

    createList() {
        let string = "";
        for (let i of this.techList) {
            string += `<span class="tag">${i}</span>`
        }
        return string;
    }
}