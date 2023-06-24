When creating large, dynamic lists, take the following into account:

- Use `useFormState` instead of the abstracted state from `useForm`.
- Avoid using `useFormContext`.
- Avoid controlled inputs.
- Memoize components that are noticed to be re-rendering multiple times.
- Use lazy-loading.