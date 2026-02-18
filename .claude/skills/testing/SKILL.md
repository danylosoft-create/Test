# React Testing Skill

Testing specialist for React + Vitest projects.

## When to use

Invoke when writing or reviewing tests.

## Rules

1. **Test behavior, not implementation** - Focus on what the code does, not how
2. **One assertion per test** - Keep tests focused and readable
3. **Mock external deps** - Never call real APIs in tests
4. **Arrange-Act-Assert** - Structure every test clearly
5. **Name tests descriptively** - `should [do X] when [condition Y]`

## Commands

```bash
pnpm test              # Run all tests
pnpm test:ci           # Run with JUnit output
pnpm --filter <app> test  # Run specific app tests
```

## Stack

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - API mocking (if needed)

## Patterns

```typescript
// Good: behavior-focused
it('should show error when login fails', async () => {
  render(<Login />)
  await userEvent.type(screen.getByLabelText('Email'), 'bad@email')
  await userEvent.click(screen.getByRole('button', { name: 'Login' }))
  expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
})

// Bad: implementation-focused
it('should call setError with message', () => { ... })
```
