# Form Builder Documentation

## Description

Form Builder is a dynamic and flexible tool for creating forms with support for autofill, validations, and dynamic rendering of fields. Using React, react-hook-form, Zod, and Material-UI, the project allows easy creation of forms with various types of fields such as text inputs, radio buttons, checkboxes, select menus, and groups of fields. It also supports autofill from an API and displays form results in a modal dialog.

## Features

- Dynamic Field Generation – Supports multiple field types including text, radio buttons, checkboxes, and select menus.
- Autofill from API – Automatically fills data in fields based on conditions met, such as values from other fields.
- Zod Validations – Validates input data using the Zod library for data validation.
- Field Groups – Supports form groups with nested fields, dynamically shown or hidden based on the value of other fields.
- Modal Dialog for Output – After successful form submission, the results are shown in a dialog modal.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IoannaTsenkova/form-builder.git
cd form-builder
```

2. Install dependencies:

```bash
yarn install
```

3. Start the application:

```bash
yarn start
```

After running the application, open your browser and navigate to http://localhost:5173/ to see the app in action.

## Requirements

- React (version 18 or higher)
- react-hook-form
- Zod (for data validation)
- Material-UI
- msw (for mocking API requests)

## How It Works

1. **JSON Structure**:
   The project uses JSON to define the form. Each object in the `fields` array contains information about the field type, label, name, and additional options such as validation or autofill.

Example JSON:

```json
{
  "title": "User Information",
  "fields": [
    {
      "type": "text",
      "name": "username",
      "label": "Username",
      "required": true
    },
    {
      "type": "radio",
      "name": "gender",
      "label": "Gender",
      "options": ["Male", "Female"],
      "required": true
    },
    {
      "type": "group",
      "name": "contact",
      "label": "Contact Info",
      "fields": [
        {
          "type": "text",
          "name": "email",
          "label": "Email"
        },
        {
          "type": "text",
          "name": "phone",
          "label": "Phone"
        }
      ]
    }
  ]
}
```

2. **Form Handling**:
   When the user submits the form, the form values are validated and filtered using the `filterVisibleFields` function. If the form is successfully validated, the output is displayed in a modal dialog.

## Examples to Include

### Example 1: Simple Form with Text and Radio Fields

```json
{
  "title": "User Registration",
  "fields": [
    {
      "type": "text",
      "name": "username",
      "label": "Username",
      "required": true
    },
    {
      "type": "radio",
      "name": "gender",
      "label": "Gender",
      "options": ["Male", "Female"],
      "required": true
    }
  ]
}
```

### Example 2: Form with Conditional Fields

This form shows how fields can be conditionally displayed based on another field’s value.

```json
{
  "title": "Conditional Form",
  "fields": [
    {
      "type": "dropdown",
      "name": "role",
      "label": "Role",
      "options": ["Admin", "User", "Guest"],
      "required": true
    },
    {
      "type": "text",
      "name": "secretInfo",
      "label": "Secret Info",
      "visibleIf": { "role": "Admin" }
    }
  ]
}
```

### Example 3: Form with Autofill from API

This form automatically fills in fields based on conditions using mock API data.

```json
{
  "title": "API Autofill Form",
  "fields": [
    {
      "type": "dropdown",
      "name": "role",
      "label": "Role",
      "options": ["Admin", "User", "Guest"],
      "required": true
    },
    {
      "type": "text",
      "name": "email",
      "label": "Email",
      "autofillFromApi": true,
      "autofillCondition": { "role": "Admin" }
    }
  ]
}
```

### Example 4: Form with Nested Groups of Fields

This example demonstrates how to use groups of fields and nested fields.

```json
{
  "title": "Nested Groups Form",
  "fields": [
    {
      "type": "group",
      "name": "contact",
      "label": "Contact Information",
      "fields": [
        {
          "type": "text",
          "name": "email",
          "label": "Email"
        },
        {
          "type": "text",
          "name": "phone",
          "label": "Phone"
        }
      ]
    }
  ]
}
```

### Example 5: Form with Validation Using Zod

This form demonstrates how to use Zod for validation, including required fields and minimum length.

```json
{
  "title": "Validated Form",
  "fields": [
    {
      "type": "text",
      "name": "username",
      "label": "Username",
      "validation": {
        "minLength": 5
      },
      "required": true
    },
    {
      "type": "email",
      "name": "email",
      "label": "Email",
      "required": true
    }
  ]
}
```
### Example 6: Form with Custom Validation Rules

This form demonstrates how to set custom rules for validation based on other fields value.

```json
{
  "title": "Dynamic Validation Form",
  "fields": [
    {
      "type": "dropdown",
      "name": "identificationType",
      "label": "Identification Type",
      "options": [
        "PERSONAL ID",
        "PASSPORT"
      ],
      "required": true
    },
    {
      "type": "text",
      "name": "identificationNumber",
      "label": "Identification Number",
      "required": true,
      "validation": {
        "rules": {
          "dependsOn": "identificationType",
          "dependencies": {
            "PERSONAL ID": "^[0-9]+$",
            "PASSPORT": "^[a-zA-Z0-9]+$"
          },
          "message": "Identification Number is invalid based on the Identification Type"
        }
      }
    }
  ]
}
```


## Final Thoughts

This form builder provides a flexible way to create dynamic forms with robust validation, conditional visibility, autofill capabilities, and more. By leveraging React, react-hook-form, Zod, and Material-UI, this project delivers a modern, user-friendly solution for building dynamic forms.



