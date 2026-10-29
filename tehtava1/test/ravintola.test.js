import { expect, it } from 'vitest';
import ravintola from '../ravintola';

it('should calculate total price correctly', () => {
  // Arrange: Set up test data
  const result = ravintola.laskeLasku(true, true, true);
  const expected = 17;

  // Act: Execute the function

  // Assert: Verify the result
  expect(result).toBe(expected);
});

it('should have the correct value', () => {
  const juomat = ['Tee', 'Kahvi', 'Maito', 'Mehu'];
  const result = ravintola.palautaTaulukonSatunnainenArvo(juomat);

  expect(juomat).toContain(result);
});

it('should return an array', () => {
  const result = ravintola.syoRavintolassa(3);

  // Array.isArray() palauttaa true, jos result on taulukko.
  // Testi varmistaa, että funktion palautusarvo on taulukko.
  expect(Array.isArray(result)).toBe(true);
});
