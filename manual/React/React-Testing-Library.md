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
  deleteAction: jest.fn()
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
