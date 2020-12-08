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
      for (let i = 0; i < this.items.length; i++) {
          if (!this.isAgedBrie(this.items[i]) && !this.isBackstagePass(this.items[i])) {
              if (this.items[i].quality > 0) {
                  if (!this.isSulfuras(this.items[i])) {
                      this.decreaseItemQuality(this.items[i]);
                  }
              }
          } else {
              if (this.isQualityLessThanMax(this.items[i])) {
                   this.increaseItemQuality(this.items[i]);
                  if (this.isBackstagePass(this.items[i])) {
                      if (this.items[i].sellIn < 10) {
                          if (this.isQualityLessThanMax(this.items[i])) {
                               this.increaseItemQuality(this.items[i]);
                          }
                      }
                      if (this.items[i].sellIn < 6) {
                          if (this.isQualityLessThanMax(this.items[i])) {
                               this.increaseItemQuality(this.items[i]);
                          }
                      }
                  }
              }
          }

          if (!this.isSulfuras(this.items[i])) {
              this.items[i].sellIn = this.items[i].sellIn - 1;
          }

          if (this.items[i].sellIn < 0) {
              if (!this.isAgedBrie(this.items[i])) {
                  if (!this.isBackstagePass(this.items[i])) {
                      if (this.items[i].quality > 0) {

                          if (!this.isSulfuras(this.items[i])) {
                              this.decreaseItemQuality(this.items[i]);
                          }
                      }
                  } else {
                      this.items[i].quality = this.items[i].quality - this.items[i].quality
                  }
              } else {
                  if (this.isQualityLessThanMax(this.items[i])) {
                      this.increaseItemQuality(this.items[i]);
                  }
              }
          }
      }

      return this.items;
  }

  private isSulfuras(item: Item) {
    return item.name == 'Sulfuras, Hand of Ragnaros';
  }

  private isBackstagePass(item: Item) {
    return  item.name == 'Backstage passes to a TAFKAL80ETC concert';
  }

  private isAgedBrie(item: Item) {
    return item.name == 'Aged Brie';
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
