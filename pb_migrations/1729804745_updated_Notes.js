/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ynd8uqin64yd7bs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xts2lntk",
    "name": "Content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ynd8uqin64yd7bs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xts2lntk",
    "name": "Text",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
