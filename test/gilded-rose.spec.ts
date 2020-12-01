import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

  it('should create Item with given name: Foo', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it('should not create Item with negative quality', function () {
    const gildedRose = new GildedRose([new Item('foo', -1, -1)]);
    const items = gildedRose.items;
    expect(items[0].quality).to.greaterThan(-1);
  })

});
