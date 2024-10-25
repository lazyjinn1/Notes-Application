/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ynd8uqin64yd7bs")

  // remove
  collection.schema.removeField("xts2lntk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x8karyay",
    "name": "content",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ynd8uqin64yd7bs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xts2lntk",
    "name": "content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("x8karyay")

  return dao.saveCollection(collection)
})
