

class Markdown {
    mdText: string

    constructor(mdText: string) {
        this.mdText = mdText
    }

    htmlText() {
        return this.mdText
    }
}