import * as Inventory from "./inventory";

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
      if (GildedRose.isSulfuras(item)) continue;

      const good = new GoodCategory().buildFor(item);
      if (!good) continue;
      good.update();
      item.quality = good.quality;
      item.sellIn = good.sellIn;
    }

    return this.items;
  }

  private static isSulfuras(item: Item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }
}

class GoodCategory {
  buildFor(item: Item) {
    if (GoodCategory.isGeneric(item)) {
      return new Inventory.GenericItem(item.quality, item.sellIn);
    } else if (GoodCategory.isAgedBrie(item)) {
      return new Inventory.AgedBrie(item.quality, item.sellIn);
    } else if (GoodCategory.isBackstagePass(item)) {
      return new Inventory.BackstagePass(item.quality, item.sellIn);
    }
  }

  private static isGeneric(item: Item) {
    return !(
      GoodCategory.isBackstagePass(item) || GoodCategory.isAgedBrie(item)
    );
  }

  private static isBackstagePass(item: Item) {
    return item.name == "Backstage passes to a TAFKAL80ETC concert";
  }

  private static isAgedBrie(item: Item) {
    return item.name == "Aged Brie";
  }
}
