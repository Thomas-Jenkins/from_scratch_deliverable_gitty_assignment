const pool = require('../utils/pool');

module.exports = class Posts {
  id;
  email;
  login;
  content;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.login = row.login;
    this.content = row.content;
  }

  static async getAll() {
    const { rows } = pool.query(
      `
        SELECT * FROM posts
        `
    );
    return rows.map((row) => new Posts(row[0])); 
  }
  static async insert({ email, login, content }) {
    const { rows } = pool.query(
      `
        INSERT INTO posts (email, login, content)
        VALUES ($1, $2, $3)
        RETURNING *
        `
      , [email, login, content]
    );
    return new Posts(rows[0]);
  }

};
