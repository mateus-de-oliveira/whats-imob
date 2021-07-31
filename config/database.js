const faunadb = require('faunadb')

export const q = faunadb.query

export const client = new faunadb.Client({
  secret: 'fnAEODMAOUACREd5j5lxKk7JWBrDhfOPJZLkadUY',
})
