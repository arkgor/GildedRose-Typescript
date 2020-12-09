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
        const generic = new GenericItem(item.quality, item.sellIn)
        generic.update()
        item.quality = generic.quality
        item.sellIn = generic.sellIn
      } else if (this.isAgedBrie(item)) {
        const aged = new AgedBrie(item.quality, item.sellIn)
        aged.update()
        item.quality = aged.quality
        item.sellIn = aged.sellIn
      } else if (this.isBackstagePass(item)) {
        const backstagePass = new BackstagePass(item.quality, item.sellIn)
        backstagePass.update()
        item.quality = backstagePass.quality
        item.sellIn = backstagePass.sellIn
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