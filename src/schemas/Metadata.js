import fields from './fields/index';
import * as validators from './fields/validators';
import SchemaDefinition from './SchemaDefinition';

const MetadataDefinition = new SchemaDefinition({
  name: [
    fields.string({ max: 256 }),
    'Name of the instance',
  ],
  description: [
    fields.string({ max: 2048 }),
    'Description of instance',
  ],
  authors: [
    fields.arrayOf(validators.id(), { required: true }).required,
    'IDs of authors',
  ],
  tags: [
    fields.object().required,
    'Dictionary of tags defining object',
  ],
});

export default MetadataDefinition;
