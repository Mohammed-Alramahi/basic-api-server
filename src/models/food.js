"use strict";

const uuid = require("uuid").v4;

class Food {
  constructor() {
    this.db = [];
  }

  create(instance) {
    if (instance.name && instance.description) {
      const record = {
        id: uuid(),
        data: {
          name: instance.name,
          description: instance.description,
        },
      };
      this.db.push(record);
      return record;
    }
  }

  read(id) {
    if (id) {
      return this.db.find((record) => record.id === id);
    } else {
      return this.db;
    }
  }

  update(id, record) {
    for (let i = 0; i < this.db.length; i++) {
      if (id == this.db[i].id) {
        this.db[i].data.name = record.name;
        this.db[i].data.description = record.description;
        return this.db[i];
      }
    }
  }

  delete(id) {
    this.db = this.db.filter((record) => record.id !== id);
    return this.db.find((item) => {
      if (item.id === id) {
        return item;
      }
    });
  }
}

module.exports = Food;
