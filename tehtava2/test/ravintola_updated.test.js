import { expect, it } from 'vitest';
import ravintola from '../ravintola_updated.js';

// pienempi kuin paikkojen määrä
(it('should return orders when customer count is less than to capacity'),
  () => {
    const result = ravintola.syoRavintolassa(10);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(10);
  });

// yhtä suuuri kuin paikkojen määrä
(it('should return order when customer count is equal to capacity'),
  () => {
    const result = ravintola.syoRavintolassa(ravintola.paikkojenMaara);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(ravintola.paikkojenMaara);
  });

//testitapaus 2
(it('should throw error when there are not enought seats'),
  () => {
    ravintola.syoRavintolassa(10);

    const result = ravintola.syoRavintolassa(6);

    expect(result.toThrowError());
  });

// testitapaus 3
(it('should return array'),
  () => {
    const tilaus = [
      { ruoka: 'Vihersalaatti', hinta: 7 },
      { ruoka: 'Makaroonilaatikko', hinta: 6 },
      { ruoka: 'Pulla', hinta: 2 },
    ];
    const result = ravintola.laskeLasku(tilaus);

    expect(result).toBe(15);
  });
