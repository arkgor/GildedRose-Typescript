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

    reset() {
        this.amount = 0;
    }

    get lessThanMax() {
        return this.amount < 50
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

        if (this._quality.lessThanMax) {
            if (this.sellIn < 10) {
                this._quality.increase();
            }
            if (this.sellIn < 6) {
                this._quality.increase();
            }
        }
        this.sellIn = this.sellIn - 1;

        if (this.sellIn < 0) {
            this._quality.reset();
        }
    }
}