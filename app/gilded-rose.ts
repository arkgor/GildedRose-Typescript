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
        // if not named "Aged Brie" and not named "Backstage passes to a TAFKAL80ETC concert"
        // if quality greater than and name is not "Sulfuras, Hand of Ragnaros"
        // quality lowers by 1
          if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].quality > 0) {
                  if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                      this.items[i].quality = this.items[i].quality - 1
                  }
              }
          } else {
            // Aged Brie and 'Backstage passes to a TAFKAL80ETC concert' gets more quality wit sellIn value decrease
            // but no more than quality 50
              if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1
                  if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                      // 'Backstage passes to a TAFKAL80ETC concert' starts increasing with day 11
                      if (this.items[i].sellIn < 10) {
                          // duplication of quality < 50
                          if (this.items[i].quality < 50) {
                              this.items[i].quality = this.items[i].quality + 1
                          }
                      }
                      // 'Aged Brie starts increasing with sellIn 5>
                      if (this.items[i].sellIn < 6) {
                          // duplication of quality < 50
                          if (this.items[i].quality < 50) {
                              this.items[i].quality = this.items[i].quality + 1
                          }
                      }
                  }
              }
          }

          // decrease sellIn value for every item other than "Sulfuras, Hand of Ragnaros"
          // ?? shouldn't sellIn be decreased at the end ??
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].sellIn = this.items[i].sellIn - 1;
          }

          // special treatment for passed sellIn
          // ?? first If and this If gets fired, what makes two calculations on the same value
          if (this.items[i].sellIn < 0) {
            // Aged Brie increases the quality when due date passed, but no more than 50
              if (this.items[i].name != 'Aged Brie') {
                  // Backstage passes to a TAFKAL80ETC concert - immediately goes to 0 if due date passed
                  if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                      if (this.items[i].quality > 0) {

                    // Sulfuras, Hand of Ragnaros - does not change quality
                          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                              this.items[i].quality = this.items[i].quality - 1
                          }
                      }
                  } else {
                      this.items[i].quality = this.items[i].quality - this.items[i].quality
                  }
              } else {
                  if (this.items[i].quality < 50) {
                      this.items[i].quality = this.items[i].quality + 1
                  }
              }
          }
      }

      // ?? ideas for improvements
      // 1. extract each special Item logic
        // for 'Aged Bire' do this ...
        // for 'Sulfuras, Hand of Ragnaros' do this ...
        // for 'Backstage passes to a TAFKAL80ETC concert' do this ...
        // for rest do this ....
      // 2. maybe use switch for that, depending on the name
        

      return this.items;
  }
}