class Quality {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    degrade() {
        if (this.amount > 0) {
            this.amount -= 1;

        }
    }

    increase() {
        if (this.amount < 50) {
            this.amount += 1;
        }
    }
}

export class GenericItem {
    sellIn: number;

    constructor(quality: number, sellIn: number) {
        this._quality = new Quality(quality);
        this.sellIn = sellIn;
    }

    private _quality: Quality;

    get quality() {
        return this._quality.amount;
    }

    update() {

        this._quality.degrade();
        this.sellIn = this.sellIn - 1;

        if (this.sellIn < 0) {
            this._quality.degrade();
        }
    }
}

export class AgedBrie {
    sellIn: number;

    constructor(quality: number, sellIn: number) {
        this._quality = new Quality(quality);
        this.sellIn = sellIn
    }

    private _quality: Quality;

    get quality() {
        return this._quality.amount;
    }

    update() {
        this._quality.increase();
        this.sellIn = this.sellIn - 1;
        if (this.sellIn < 0) this._quality.increase();
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