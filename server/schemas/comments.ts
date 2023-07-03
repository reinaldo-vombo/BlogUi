import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comentarios',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'comment',
      title: 'Comentario',
      type: 'string',
    }),
  ],
})
