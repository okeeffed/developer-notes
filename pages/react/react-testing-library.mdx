---
menu: React
name: React Testing Library
---

# React Testing Library

An example of the library in action:

```typescript
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TeamDropdown from '../TeamDropdown';

const stubProps = {
  isArchiveable: false,
  editAction: jest.fn(),
  archiveAction: jest.fn(),
  deleteAction: jest.fn(),
};

const Wrapper = (props: any = {}) => <TeamDropdown {...stubProps} {...props} />;

describe('team dropdown state', () => {
  test('should not be archivable when isArchiveable is false', () => {
    const component = render(<Wrapper />);
    fireEvent.click(component.getByText('Open menu'));

    expect(component.queryByText('Archive')).toBeNull();
  });

  test('should be archivable when isArchiveable is true', () => {
    const component = render(<Wrapper isArchiveable={true} />);
    fireEvent.click(component.getByText('Open menu'));

    expect(component.queryByText('Archive')).toBeTruthy();
  });

  test('should fire archive action', () => {
    const component = render(<Wrapper isArchiveable={true} />);
    fireEvent.click(component.getByText('Open menu'));
    expect(component.queryByText('Archive')).toBeTruthy();

    fireEvent.click(component.getByText('Archive'));
    expect(stubProps.archiveAction).toBeCalled();
  });

  test('should fire edit action', () => {
    const component = render(<Wrapper />);
    fireEvent.click(component.getByText('Open menu'));
    fireEvent.click(component.getByText('Edit'));
    expect(stubProps.editAction).toBeCalled();
  });

  test('should fire delete action', () => {
    const component = render(<Wrapper />);
    fireEvent.click(component.getByText('Open menu'));
    fireEvent.click(component.getByText('Delete'));
    expect(stubProps.deleteAction).toBeCalled();
  });
});
```

## Mocking

```typescript
// Component.tsx
// super basic example w/ no types
import useAPIHook from 'path/to/hook';
const Component = () => {
  const { data, loading } = useAPIHook(); // whatever you are getting destructured from the hook

  if (loading) return <p data-automation-id="example-loading">Loading</p>;

  return <p data-automation-id="example-data">Doing cool stuff with {data}</p>;
};

// Component.test.tsx
import Component from 'path/to/component';
import useAPIHook from 'path/to/hook';
jest.mock('path/to/hook');
describe('useful description', () => {
  test('component does this when data available', async () => {
    useAPIHook.mockImplementation(() => ({
      data: 'mocks',
      loading: false,
    }));
    const { getByTestId } = await render(<Component />);
    expect(getByTestId('example-data')).toBeTruthy();
  });

  test('component shows loading when API loading', async () => {
    useAPIHook.mockImplementation(() => ({
      data: 'mocks',
      loading: true,
    }));
    const { getByTestId } = await render(<Component />);
    expect(getByTestId('example-loading')).toBeTruthy();
  });
});
```
