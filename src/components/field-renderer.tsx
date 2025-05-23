import type { FormField as Field } from '../types/form-types';
import TextFieldRenderer from './fields/text-field';
import CheckboxFieldRenderer from './fields/checkbox-field';
import RadioFieldRenderer from './fields/radio-field';
import DropdownFieldRenderer from './fields/dropdown-field';
import GroupFieldRenderer from './fields/group-field';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  field: Field;
  parentName?: string;
}

export default function FieldRenderer({ field, parentName = '' }: Props) {
  const { control } = useFormContext();
  const fullName = parentName ? `${parentName}.${field.name}` : field.name;

  if ('visibleIf' in field && field.visibleIf) {
    const [conditionFieldName, expectedValue] = Object.entries(field.visibleIf)[0];

    const conditionValue = useWatch({
      control,
      name: conditionFieldName
    });

    if (conditionValue !== expectedValue) {
      return null;
    }
  }

  switch (field.type) {
    case 'text':
    case 'textarea':
      return <TextFieldRenderer field={field} name={fullName} />;
    case 'checkbox':
      return <CheckboxFieldRenderer field={field} name={fullName} />;
    case 'dropdown':
      return <DropdownFieldRenderer field={field} name={fullName} />;
    case 'radio':
      return <RadioFieldRenderer field={field} name={fullName} />;
    case 'group':
      return <GroupFieldRenderer field={field} parentName={fullName} />;
    default:
      return null;
  }
}
