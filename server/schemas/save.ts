import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'save',
  title: 'Gardado',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'userId',
      title: 'UserId',
      type: 'string',
    }),
  ],
})
