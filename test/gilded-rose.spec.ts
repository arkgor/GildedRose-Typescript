import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should create Item with given name: Foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("should match initial snapshot", function () {
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
      new Item("Conjured Mana Cake", 3, 6),
    ];
    var gildedRose = new GildedRose(items);

    var days = 2;
    var values: string[] = [];
    for (var i = 0; i < days; i++) {
      values.push("-------- day " + i + " --------");
      values.push("name, sellIn, quality");
      items.forEach(function (element) {
        values.push(
          element.name + " " + element.sellIn + " " + element.quality
        );
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
    ];

    expect(snapshot).to.eql(values);
  });
});

describe("'Items quality checks'", function () {
  it("'Backstage passes to a TAFKAL80ETC concert'", function () {
    testBackstagePassQuality(0, -1, 20);
    testBackstagePassQuality(0, 0, 20);
    testBackstagePassQuality(23, 3, 20);
    testBackstagePassQuality(22, 6, 20);
    testBackstagePassQuality(22, 8, 20);
    testBackstagePassQuality(21, 10, 20);
    testBackstagePassQuality(21, 12, 20);
    testBackstagePassQuality(50, 3, 50);

    function testBackstagePassQuality(
      expected: number,
      sellIn: number,
      quality: number
    ) {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).to.equal(expected);
    }
  });

  it("checks 'Aged Brie' quality pass", function () {
    testAgedBrieQuality(22, -1, 20);
    testAgedBrieQuality(22, 0, 20);
    testAgedBrieQuality(21, 3, 20);
    testAgedBrieQuality(21, 6, 20);
    testAgedBrieQuality(21, 8, 20);
    testAgedBrieQuality(21, 10, 20);
    testAgedBrieQuality(21, 11, 20);

    function testAgedBrieQuality(
      expected: number,
      sellIn: number,
      quality: number
    ) {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", sellIn, quality),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).to.equal(expected);
    }
  });

  it("Generic Items", function () {
    testGenericItemQuality(18, -2, 20);
    testGenericItemQuality(18, 0, 20);
    testGenericItemQuality(19, 4, 20);
    testGenericItemQuality(19, 8, 20);
    testGenericItemQuality(19, 12, 20);

    function testGenericItemQuality(
      expected: number,
      sellIn: number,
      quality: number
    ) {
      const gildedRose = new GildedRose([new Item("Foo", sellIn, quality)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).to.equal(expected);
    }
  });
});
