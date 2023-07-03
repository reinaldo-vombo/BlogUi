import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descriçáo',
      type: 'string',
    }),
    defineField({
      name: 'destination',
      title: 'Destinação',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'categoria',
      type: 'string',
    }),
    defineField({
      name: 'userId',
      title: 'Id do usuario',
      type: 'string',
    }),
    defineField({
      name: 'postedBy',
      title: 'postedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{type: 'save'}],
    }),
    defineField({
      name: 'comments',
      title: 'Comentarios',
      type: 'array',
      of: [{type: 'comment'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    //  defineField({
    //    name: 'body',
    //    title: 'Body',
    //    type: 'blockContent',
    //  }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
