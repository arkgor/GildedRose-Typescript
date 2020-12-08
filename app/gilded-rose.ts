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
      if (this.isSulfuras(item)) {
        // don't do anything
      } else if (this.isGeneric(item)) {
        this.updateGeneric(item);
      } else if (this.isAgedBrie(item)) {
        this.updateAgedBrie(item);
      } else if (this.isBackstagePass(item)) {
        this.updateBackstagePass(item);
      }
    }

    return this.items;
  }

  private updateBackstagePass(item: Item) {
    if (this.isQualityLessThanMax(item)) {
      this.increaseItemQuality(item);
      if (item.sellIn < 10) {
        if (this.isQualityLessThanMax(item)) {
          this.increaseItemQuality(item);
        }
      }
      if (item.sellIn < 6) {
        if (this.isQualityLessThanMax(item)) {
          this.increaseItemQuality(item);
        }
      }
      this.decreaseSellIn(item);
    }

    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }

  private updateAgedBrie(item: Item) {
    if (this.isQualityLessThanMax(item)) {
      this.increaseItemQuality(item);
    }
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      if (this.isQualityLessThanMax(item)) {
        this.increaseItemQuality(item);
      }
    }
  }

  private updateGeneric(item: Item) {
    if (item.quality > 0) {
      this.decreaseItemQuality(item);
    }
    this.decreaseSellIn(item);
    if (item.sellIn < 0) {
      if (item.quality > 0) {
        this.decreaseItemQuality(item);
      }
    }
  }

  private decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private isGeneric(item: Item) {
    return !(
      this.isSulfuras(item) ||
      this.isBackstagePass(item) ||
      this.isAgedBrie(item)
    );
  }

  private isSulfuras(item: Item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  private isBackstagePass(item: Item) {
    return item.name == "Backstage passes to a TAFKAL80ETC concert";
  }

  private isAgedBrie(item: Item) {
    return item.name == "Aged Brie";
  }

  private isQualityLessThanMax(item: Item) {
    return item.quality < 50;
  }

  private increaseItemQuality(item: Item) {
    item.quality = item.quality + 1;
  }

  private decreaseItemQuality(item: Item) {
    item.quality = item.quality - 1;
  }
}
