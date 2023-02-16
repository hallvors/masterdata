import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'masterdata-skolenmin',

  projectId: 'bkac9q0w',
  dataset: 'skolen-cdu',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
