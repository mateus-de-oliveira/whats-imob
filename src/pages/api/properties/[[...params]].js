import { q, client } from '../../../../config/database'
import { isEmpty } from 'lodash/fp'

const getAllProperties = () =>
  client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('properties'))),
      q.Lambda((x) => q.Get(x)),
    ),
  )

const getAllPropertiesByUsers = (id) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('properties_by_user'), id)),
      q.Lambda('x', q.Get(q.Var('x'))),
    ),
  )
}

const createPropertie = (data) =>
  client.query(
    q.Create(q.Collection('properties'), {
      data,
    }),
  )

const updatePropertie = (id, data) => {
  return client.query(
    q.Update(q.Ref(q.Collection('properties'), id), {
      data,
    }),
  )
}

const deletePropertie = (id) => {
  return client.query(q.Delete(q.Ref(q.Collection('properties'), id)))
}

export default function Users(req, res) {
  if (req.method === 'GET') {
    if (isEmpty(req.query)) {
      getAllProperties()
        .then(({ data }) => {
          let response = data.map((item) => {
            item.data.propertie_id = item.ref.id
            item.data.ts = item.ts
            return item.data
          })

          res.status(200).json(response)
        })
        .catch((error) => res.status(500).json({ error }))
    } else {
      const { params } = req.query

      getAllPropertiesByUsers(params.join())
        .then(({ data }) => {
          let response = data.map((item) => {
            item.data.propertie_id = item.ref.id
            item.data.ts = item.ts
            return item.data
          })

          res.status(200).json(response)
        })
        .catch((error) => res.status(500).json({ error }))
    }
  } else if (req.method === 'POST') {
    createPropertie(req.body)
      .then((response) => {
        console.log(response)
        const data = {
          propertie_id: response.ref.id,
          name: response.data.name,
          description: response.data.description,
          message: 'Imóvel adicionado com sucesso!',
        }
        res.status(200).json({ ...data })
      })
      .catch((error) => res.status(500).json({ error }))
  } else if (req.method === 'PUT') {
    const { propertie_id, data } = req.body

    updatePropertie(propertie_id, data)
      .then(() => {
        res.status(200).json({ message: 'Imóvel atualizado com sucesso!' })
      })
      .catch((error) => res.status(500).json({ error }))
  } else if (req.method === 'DELETE') {
    const { propertie_id } = req.body

    deletePropertie(propertie_id)
      .then(() => {
        res.status(200).json({ message: 'Imóvel excluído com sucesso!' })
      })
      .catch((error) => res.status(500).json({ error }))
  }
}
