export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const good = new GoodCategory().buildFor(item)
      if (!good) continue
      good.update()
      item.quality = good.quality
      item.sellIn = good.sellIn
    }

    return this.items;
  }

}

class GoodCategory {
  buildFor(item: Item) {
    if (GoodCategory.isSulfuras(item)) {
      // don't do anything
    } else if (GoodCategory.isGeneric(item)) {
      return new GenericItem(item.quality, item.sellIn)
    } else if (GoodCategory.isAgedBrie(item)) {
      return new AgedBrie(item.quality, item.sellIn)
    } else if (GoodCategory.isBackstagePass(item)) {
      return new BackstagePass(item.quality, item.sellIn)
    }
  }

  private static isGeneric(item: Item) {
    return !(
        GoodCategory.isSulfuras(item) ||
        GoodCategory.isBackstagePass(item) ||
        GoodCategory.isAgedBrie(item)
    );
  }

  private static isSulfuras(item: Item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  private static isBackstagePass(item: Item) {
    return item.name == "Backstage passes to a TAFKAL80ETC concert";
  }

  private static isAgedBrie(item: Item) {
    return item.name == "Aged Brie";
  }
}

class GenericItem {
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

class AgedBrie {
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

class BackstagePass {
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