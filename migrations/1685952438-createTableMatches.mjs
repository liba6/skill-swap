export async function up(sql) {
  await sql`
CREATE TABLE matches(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id_teacher integer NOT NULL ,
  user_id_student integer NOT NULL,
  skill varchar(20) NOT NULL
)`;
}

export async function down(sql) {
  await sql`
  DROP TABLE matches`;
}
