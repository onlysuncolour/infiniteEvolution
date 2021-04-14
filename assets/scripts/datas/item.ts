import Item from "../basic/item"

export const ItemData = {
    Save: {
        items: []
    },
    initItems(items) {
        if (items) {
            this.Save.items = items.map(i => new Item(i))
        }
    },
    loadItems() {
        return this.Save.items;
    }
}
