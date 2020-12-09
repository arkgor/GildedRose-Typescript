export class GenericItem {
    sellIn: number;
    quality: number;

    constructor(quality: number, sellIn: number) {
        this.quality = quality;
        this.sellIn = sellIn
    }

    update() {
        if (this.quality > 0) {
            this.quality = this.quality - 1;
        }

        this.sellIn = this.sellIn - 1;

        if (this.sellIn < 0) {
            if (this.quality > 0) {
                this.quality = this.quality - 1;
            }
        }
    }
}

export class AgedBrie {
    sellIn: number;
    quality: number;

    constructor(quality: number, sellIn: number) {
        this.quality = quality;
        this.sellIn = sellIn
    }

    update() {
        if (this.quality < 50) {
            this.quality = this.quality + 1;
        }
        this.sellIn = this.sellIn - 1;
        if (this.sellIn < 0) {
            if (this.quality < 50) {
                this.quality = this.quality + 1;
            }
        }
    }
}

export class BackstagePass {
    sellIn: number;
    quality: number;

    constructor(quality: number, sellIn: number) {
        this.quality = quality;
        this.sellIn = sellIn
    }

    update() {
        if (this.quality < 50) {
            this.quality = this.quality + 1;
            if (this.sellIn < 10) {
                if (this.quality < 50) {
                    this.quality = this.quality + 1;
                }
            }
            if (this.sellIn < 6) {
                if (this.quality < 50) {
                    this.quality = this.quality + 1;
                }
            }
            this.sellIn = this.sellIn - 1;
        }

        if (this.sellIn < 0) {
            this.quality = this.quality - this.quality;
        }
    }
}