import { fireEvent, render, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import FormRenderer from '../components/form-renderer';
import type { FormField, IForm } from '../types/form-types';
import { filterVisibleFields } from '../utils/filter-visible-fields';
import userEvent from '@testing-library/user-event';

const form: IForm = {
  title: 'Extended Form',
  fields: [
    {
      type: 'text',
      name: 'username',
      label: 'Username'
    },
    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      options: ['Male', 'Female'],
      required: true
    },
    {
      type: 'checkbox',
      name: 'acceptTerms',
      label: 'I accept the terms and conditions',
      required: true
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      options: ['USA', 'Canada', 'Germany']
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contact Info',
      fields: [
        {
          type: 'text',
          name: 'email',
          label: 'Email'
        },
        {
          type: 'text',
          name: 'phone',
          label: 'Phone'
        }
      ]
    }
  ]
};

test('renders all form fields and handles interactions', async () => {
  const { getByLabelText } = render(<FormRenderer jsonForm={form} />);

  expect(getByLabelText(/^Username$/i)).toBeInTheDocument();

  expect(getByLabelText(/^Male$/i)).toBeInTheDocument();
  expect(getByLabelText(/^Female$/i)).toBeInTheDocument();

  await userEvent.click(getByLabelText(/^Male$/i));
  expect(getByLabelText(/^Male$/i)).toBeChecked();

  const checkbox = getByLabelText(/^I accept the terms and conditions$/i);
  expect(checkbox).toBeInTheDocument();

  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  const select = getByLabelText(/Country/i);
  expect(select).toBeInTheDocument();

  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/phone/i)).toBeInTheDocument();
});

test('shows error for required fields', async () => {
  const form: IForm = {
    title: 'Test Form',
    fields: [
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        required: true
      }
    ]
  };

  const { getByText, getByRole, findByText } = render(<FormRenderer jsonForm={form} />);

  const button = getByRole('button', { name: /submit/i });
  await userEvent.click(button);

  userEvent.click(getByText(/submit/i));
  expect(await findByText(/required/i)).toBeInTheDocument();
});

test('conditionally hides field based on visibleIf', () => {
  const form: IForm = {
    title: 'Conditional',
    fields: [
      {
        type: 'text',
        name: 'role',
        label: 'Role'
      },
      {
        type: 'text',
        name: 'secret',
        label: 'Secret Field',
        visibleIf: { role: 'admin' }
      }
    ]
  };

  const { queryByLabelText, rerender } = render(<FormRenderer jsonForm={form} />);
  expect(queryByLabelText(/secret field/i)).not.toBeInTheDocument();

  rerender(<FormRenderer jsonForm={form} defaultValues={{ role: 'admin' }} />);
  expect(queryByLabelText(/secret field/i)).toBeInTheDocument();
});

test('disables autofilled field when condition matches', async () => {
  const form: IForm = {
    title: 'Autofill Test',
    fields: [
      {
        type: 'text',
        name: 'accountType',
        label: 'Account Type'
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        autofillFromApi: true,
        autofillCondition: {
          accountType: 'Business'
        }
      }
    ]
  };

  const { getByLabelText } = render(
    <FormRenderer jsonForm={form} defaultValues={{ accountType: 'Business' }} />
  );
  const emailInput = getByLabelText(/email/i);
  expect(emailInput).toBeDisabled();
});

test('filters out hidden fields from nested group', () => {
  const fields: FormField[] = [
    {
      type: 'text',
      name: 'username',
      label: 'Username',
      required: true
    },
    {
      type: 'dropdown',
      name: 'role',
      label: 'Role',
      options: ['User', 'Admin'],
      required: true
    },
    {
      type: 'group',
      name: 'profile',
      label: 'Profile',
      visibleIf: { role: 'admin' },
      fields: [
        {
          type: 'text',
          name: 'secret',
          label: 'Secret Info'
        }
      ]
    }
  ];

  const values = {
    username: 'ioanna',
    role: 'user',
    profile: {
      secret: 'something'
    }
  };

  const result = filterVisibleFields(values, fields, values);

  expect(result).toEqual({
    username: 'ioanna',
    role: 'user'
  });
});

test('populates fields with data from API when conditions are met', async () => {
  const form: IForm = {
    title: 'Conditional Autofill Test',
    fields: [
      {
        type: 'text',
        name: 'role',
        label: 'Role',
        required: true
      },
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        autofillFromApi: true,
        autofillCondition: { role: 'admin' }
      }
    ]
  };

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      headers: {
        get: () => null
      },
      json: () => Promise.resolve({
        email: 'example@example.com'
      })
    } as unknown as Response)
  );

  const { getByLabelText} = render(<FormRenderer jsonForm={form} />);

  expect((getByLabelText(/Email/i) as HTMLInputElement).value).toBe('');
  fireEvent.change(getByLabelText(/Role/i), { target: { value: 'admin' } });

  await waitFor(() => {
    expect((getByLabelText(/Email/i) as HTMLInputElement).value).toBe('example@example.com');
  });

  expect(fetch).toHaveBeenCalledWith('/api/autofill');
});
test('submits form and displays result in dialog', async () => {
  const form: IForm = {
    title: 'Test Form',
    fields: [
      { type: 'text', name: 'username', label: 'Username' },
      { type: 'text', name: 'email', label: 'Email' }
    ]
  };

  const { getByLabelText, getByText, getByRole } = render(<FormRenderer jsonForm={form} />);

  const usernameInput = getByLabelText(/username/i);
  const emailInput = getByLabelText(/email/i);

  fireEvent.change(usernameInput, { target: { value: 'ioanna' } });
  fireEvent.change(emailInput, { target: { value: 'ioanna@example.com' } });

  const button = getByRole('button', { name: /submit/i });
  await userEvent.click(button);

  userEvent.click(getByText(/submit/i));

  const dialog = getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  expect(getByText(/username/)).toBeInTheDocument();
  expect(getByText(/ioanna/)).toBeInTheDocument();
  expect(getByText(/email/)).toBeInTheDocument();
  expect(getByText(/ioanna@example.com/)).toBeInTheDocument();
});
