import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'masterdata-skolestudio',

  projectId: '7xashn1s',
  dataset: 'skolestudio',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
