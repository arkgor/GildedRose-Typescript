import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  it('should create Item with given name: Foo', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it('should match initial snapshot', function () {
    var items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];
    var gildedRose = new GildedRose(items);

    var days = 2;
    var values: string[] = [];
    for (var i = 0; i < days; i++) {
      values.push("-------- day " + i + " --------")
      values.push("name, sellIn, quality");
      items.forEach(function (element) {
        values.push(element.name + ' ' + element.sellIn + ' ' + element.quality);
      });
      gildedRose.updateQuality();
    }

    const snapshot = [
      "-------- day 0 --------",
      "name, sellIn, quality",
      "+5 Dexterity Vest 10 20",
      "Aged Brie 2 0",
      "Elixir of the Mongoose 5 7",
      "Sulfuras, Hand of Ragnaros 0 80",
      "Sulfuras, Hand of Ragnaros -1 80",
      "Backstage passes to a TAFKAL80ETC concert 15 20",
      "Backstage passes to a TAFKAL80ETC concert 10 49",
      "Backstage passes to a TAFKAL80ETC concert 5 49",
      "Conjured Mana Cake 3 6",
      "-------- day 1 --------",
      "name, sellIn, quality",
      "+5 Dexterity Vest 9 19",
      "Aged Brie 1 1",
      "Elixir of the Mongoose 4 6",
      "Sulfuras, Hand of Ragnaros 0 80",
      "Sulfuras, Hand of Ragnaros -1 80",
      "Backstage passes to a TAFKAL80ETC concert 14 21",
      "Backstage passes to a TAFKAL80ETC concert 9 50",
      "Backstage passes to a TAFKAL80ETC concert 4 50",
      "Conjured Mana Cake 2 5",
    ]

    expect(snapshot).to.eql(values);
  })

  it('should not create Item with negative quality', function () {
    const gildedRose = new GildedRose([new Item('foo', -1, -1)]);
    const items = gildedRose.items;
    expect(items[0].quality).to.greaterThan(-1);
  })

  it('quality should not be negative', function () {
    const gildedRose = new GildedRose([new Item('foo', -1, -1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.greaterThan(-1);
  })

  it('Quality should degrades twice as fast if sell date has passed', function () {
    const gildedRose = new GildedRose([new Item('foo', -2, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equals(6);
  })
});
