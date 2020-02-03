'use strict';

const comparisonDescription = require('../../src');

describe('mongo-comparison-ops-description', () => {
  describe('create', () => {
    it('should work for "equal to"', () => {
      expect(comparisonDescription.create('equal to', 1)).toEqual({ $eq: 1 });
    });

    it('should work for "greater than"', () => {
      expect(comparisonDescription.create('greater than', 2)).toEqual({ $gt: 2 });
    });

    it('should work for "greater than or equal to"', () => {
      expect(comparisonDescription.create('greater than or equal to', 1)).toEqual({ $gte: 1 });
    });

    it('should work for "less than"', () => {
      expect(comparisonDescription.create('less than', 11)).toEqual({ $lt: 11 });
    });

    it('should work for "less than or equal to"', () => {
      expect(comparisonDescription.create('less than or equal to', 13)).toEqual({ $lte: 13 });
    });

    it('should work for "not equal to"', () => {
      expect(comparisonDescription.create('not equal to', -1)).toEqual({ $ne: -1 });
    });

    it('should work for "is empty"', () => {
      expect(comparisonDescription.create('is empty')).toEqual({ $in: [null, ''] });
    });

    it('should work for "is not empty"', () => {
      expect(comparisonDescription.create('is not empty')).toEqual({ $exists: true, $nin: [null, ''] });
    });
  });

  describe('parse', () => {
    it('should work for "equal to"', () => {
      expect(comparisonDescription.parse({ $eq: 1 })).toEqual({
        operator: 'equal to',
        value: 1
      });
    });

    it('should work for "greater than"', () => {
      expect(comparisonDescription.parse({ $gt: 1 })).toEqual({
        operator: 'greater than',
        value: 1
      });
    });

    it('should work for "greater than or equal to"', () => {
      expect(comparisonDescription.parse({ $gte: 1 })).toEqual({
        operator: 'greater than or equal to',
        value: 1
      });
    });

    it('should work for "less than"', () => {
      expect(comparisonDescription.parse({ $lt: 1 })).toEqual({
        operator: 'less than',
        value: 1
      });
    });

    it('should work for "less than or equal to"', () => {
      expect(comparisonDescription.parse({ $lte: 1 })).toEqual({
        operator: 'less than or equal to',
        value: 1
      });
    });

    it('should work for "not equal to"', () => {
      expect(comparisonDescription.parse({ $ne: 1 })).toEqual({
        operator: 'not equal to',
        value: 1
      });
    });

    it('should work for "is empty"', () => {
      expect(comparisonDescription.parse({ $in: [null, ''] })).toEqual({
        operator: 'is empty'
      });
    });

    it('should work for "is not empty"', () => {
      expect(comparisonDescription.parse({ $exists: true, $nin: [null, ''] })).toEqual({
        operator: 'is not empty'
      });
    });

    describe('special cases', () => {
      it('should work for empty strings', () => {
        expect(comparisonDescription.parse({ $eq: '' })).toEqual({
          operator: 'equal to',
          value: ''
        });
      });

      it('should work for 0', () => {
        expect(comparisonDescription.parse({ $eq: 0 })).toEqual({
          operator: 'equal to',
          value: 0
        });
      });

      it('should throw for a unhandled operator', () => {
        expect(() => comparisonDescription.create('blah', 1)).toThrow();
      });

      it('should return null for a unhandled query', () => {
        expect(comparisonDescription.parse({})).toBeNull();
      });
    });
  });
});