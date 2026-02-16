# Stable Test Naming Research

## Problem
If someone changes whitespace or wording in test title, test history breaks. Example:
- `should login successfully` → `should log in successfully` = new test, history lost

## Options Explored

### 1. Hash-based ID (title hash)
```js
const testId = crypto.createHash('md5').update(testName).digest('hex').slice(0, 8)
```
**Pros:** Simple, deterministic
**Cons:** Any title change = new hash = broken history

### 2. AST-based ID (code structure hash)
Parse test file AST, hash the test's code structure instead of name.
```js
// Hash based on: file + describe block index + it block index + code body hash
const testId = hash(`${file}::${describeIndex}::${itIndex}::${bodyHash}`)
```
**Pros:** Survives title renames
**Cons:** Complex, requires AST parser, breaks if code order changes

### 3. Explicit testId metadata
Add explicit ID in test:
```js
it('should login successfully', { testId: 'auth-001' }, () => {
  // test code
})
```
**Pros:** Full control, never changes accidentally
**Cons:** Extra work for developers, not standard vitest/jest API

### 4. File + line number hash
```js
const testId = hash(`${filePath}:${lineNumber}`)
```
**Pros:** Simple, works with existing tools
**Cons:** Breaks if tests reordered or lines added above

### 5. Composite key (current approach)
```js
const testId = `${fileName}::${suiteName}::${testName}`
```
**Pros:** Human readable, easy to debug
**Cons:** Name changes break history

## Recommendation

**Short-term:** Keep composite key `{file}::{suite}::{name}` (current approach)
- Simple and works for MVP
- Human readable in dashboard

**Medium-term:** Add optional `testId` metadata support
- Allow `it('name', { id: 'stable-id' }, fn)` syntax
- Fall back to composite key if not provided
- Requires vitest/jest plugin or custom runner

**Long-term:** Explore fuzzy matching
- When test name changes slightly, use string similarity to match
- Threshold: 80% similarity = same test
- Flag as "renamed" in dashboard

## Implementation Notes

For vitest, custom metadata can be added via:
```js
// vitest.config.ts
export default defineConfig({
  test: {
    setupFiles: ['./test-setup.ts'],
  }
})

// test-setup.ts - extend expect or context
```

## Decision
Start simple with composite key. Add explicit testId support when customers request it.
