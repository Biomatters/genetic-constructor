import fields from './fields/index';
// import * as validators from './fields/validators';
import SchemaDefinition from './SchemaDefinition';

/**
 @name AnnotationDefinition
 @parent BlockDefinition
 @sbol Annotation (kinda)

 @description
 An annotation on a sequence.
 Should either have a sequence or start+end location

 Later, we may want to make a field that notes how optimizable the sequence is. E.g. none, codon-optimize, or random sequence. It may be represented as a degenerate sequence?
 */
const AnnotationDefinition = new SchemaDefinition({
  tags: [
    fields.object(),
    'Dictionary of tags defining annotation',
  ],
  name: [
    fields.string().required,
    'Name of annotation',
  ],
  description: [
    fields.string(),
    'Description of annotation',
  ],
  sequence: [
    fields.sequence({loose: true}),
    'IUPAC sequence of the annotation',
  ],
  start: [
    fields.number({min: 0}),
    'Location of start of annotation',
  ],
  end: [
    fields.number({min: 0}),
    'Location of end of annotation',
  ],
  isForward: [
    fields.bool(),
    `true if forward (5'-3'), false if reverse`,
  ],
  notes: [
    fields.object().required,
    `Notes about the annotation`,
  ],
});

export default AnnotationDefinition;
