import { q, client } from '../../../../config/database'

const getAllUsers = () =>
  client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('users'))),
      q.Lambda((x) => q.Get(x)),
    ),
  )

const createUser = (data) =>
  client.query(
    q.Create(q.Collection('users'), {
      data,
    }),
  )

const updateUser = (id, data) => {
  return client.query(
    q.Update(q.Ref(q.Collection('users'), id), {
      data,
    }),
  )
}

const deleteUser = (id) => {
  return client.query(q.Delete(q.Ref(q.Collection('users'), id)))
}

export default function Users(req, res) {
  if (req.method === 'GET') {
    getAllUsers()
      .then(({ data }) => {
        let response = data.map((item) => {
          item.data.user_id = item.ref.id
          item.data.ts = item.ts
          return item.data
        })

        res.status(200).json(response)
      })
      .catch((error) => res.status(500).json({ error }))
  } else if (req.method === 'POST') {
    createUser(req.body)
      .then(() => {
        res.status(200).json({ message: 'Usuário adicionado com sucesso!' })
      })
      .catch((error) => res.status(500).json({ error }))
  } else if (req.method === 'PUT') {
    const { user_id, data } = req.body

    updateUser(user_id, data)
      .then(() => {
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
      })
      .catch(() => res.status(500).json({ error }))
  } else if (req.method === 'DELETE') {
    const { user_id } = req.body

    deleteUser(user_id)
      .then(() => {
        res.status(200).json({ message: 'Usuário excluído com sucesso!' })
      })
      .catch((error) => res.status(500).json({ error }))
  }
}
