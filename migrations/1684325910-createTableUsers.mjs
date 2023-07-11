export async function up(sql) {
  await sql`
  CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    password_hash varchar(70) NOT NULL,
    email varchar (30)  NOT NULL,
    skill_teach varchar(20) NOT NULL,
    skill_learn varchar (20)  NOT NULL


  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE users`;
}
