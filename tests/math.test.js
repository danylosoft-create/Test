import { test, expect } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})

test('multiplies 3 * 4 to equal 12', () => {
  expect(3 * 4).toBe(12)
})

test('subtracts 10 - 4 to equal 6', () => {
  expect(10 - 4).toBe(6)
})

test('divides 20 / 5 to equal 4', () => {
  expect(20 / 5).toBe(4)
})

test('checks if array contains value', () => {
  expect([1, 2, 3]).toContain(2)
})

test('string contains substring', () => {
  expect('hello world').toContain('world')
})
