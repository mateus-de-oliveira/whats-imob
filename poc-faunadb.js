let faunadb = require('faunadb'),
  q = faunadb.query

let client = new faunadb.Client({
  secret: 'fnAEN8UKbVACRLUa2zs12gG22_Zv7CSm_Yhodxpi',
})

const imovel = {
  user: q.Select(
    'ref',
    q.Get(q.Match(q.Index('user_by_email'), 'mateusdeoliveira1530@gmail.com')),
  ),
  title: 'LOTEAMENTO PORTAL DOS VENTOS',
  description:
    'Loteamento popular para pessoas que buscam sair do aluguel ou forma de investimento a longo prazo.',
}

let createUser = client.query(
  q.Create(q.Collection('users'), {
    data: { email: 'mateusdeoliveira1530@gmail.com' },
  }),
)

let createImovel = client.query(
  q.Create(q.Collection('imoveis'), {
    data: imovel,
  }),
)
