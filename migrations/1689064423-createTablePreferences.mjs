export async function up(sql) {
  await sql`
  CREATE TABLE preferences(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    favorite_color varchar(20) NOT NULL,
    favorite_author varchar (30)  NOT NULL,
    favorite_food varchar(20) NOT NULL,
    favorite_place varchar (20)  NOT NULL
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE preferences`;
}
