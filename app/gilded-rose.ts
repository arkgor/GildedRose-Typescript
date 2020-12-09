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
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        }
      } else if (this.isAgedBrie(item)) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      } else if (this.isBackstagePass(item)) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.sellIn < 10) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          item.sellIn = item.sellIn - 1;
        }

        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
      }
    }

    return this.items;
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

}
