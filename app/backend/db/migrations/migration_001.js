exports.up = function (knex) {
    return knex.schema
      .createTable("song_topics", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("name").unique().notNullable();
        table.text("description");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .createTable("song_concepts", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("topic_id").references("id").inTable("topics").onDelete("CASCADE");
        table.string("name").unique().notNullable();
        table.text("description");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .createTable("song_titles", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("topic_id").references("id").inTable("song_topics");
        table.uuid("concept_id").references("id").inTable("song_concepts");
        table.string("title").unique().notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("song_titles").dropTableIfExists("song_concepts").dropTableIfExists("song_topics");
  };
  