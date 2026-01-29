import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  formatDateForInput,
  formatDateForDisplay,
  formatDateRange,
  getTodayString,
  isPastDate,
  isValidDateRange,
} from '@/utils/dateUtils';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDateForInput', () => {
    it('formats Date to YYYY-MM-DD', () => {
      const date = new Date('2025-01-10T12:34:56Z');
      const result = formatDateForInput(date);
      expect(result).toBe('2025-01-10');
    });

    it('returns same YYYY-MM-DD string when given a string', () => {
      const result = formatDateForInput('2025-02-15');
      expect(result).toBe('2025-02-15');
    });
  });

  describe('formatDateForDisplay', () => {
    it('formats date to readable string', () => {
      const date = new Date('2025-03-20T00:00:00Z');
      const result = formatDateForDisplay(date);
      // Exact format depends on locale; just assert it contains pieces
      expect(result).toContain('2025');
    });
  });

  describe('formatDateRange', () => {
    it('combines two dates into a range string', () => {
      const start = new Date('2025-01-10');
      const end = new Date('2025-01-12');
      const result = formatDateRange(start, end);
      expect(result).toContain('2025');
      expect(result).toContain('-');
    });
  });

  describe('getTodayString', () => {
    it('returns today as YYYY-MM-DD', () => {
      vi.setSystemTime(new Date('2025-04-05T10:00:00Z'));
      const result = getTodayString();
      expect(result).toBe('2025-04-05');
    });
  });

  describe('isPastDate', () => {
    it('returns true for dates before today', () => {
      vi.setSystemTime(new Date('2025-04-10T12:00:00Z'));
      expect(isPastDate('2025-04-09')).toBe(true); // yesterday
    });

    it('returns false for today and future dates', () => {
      vi.setSystemTime(new Date('2025-04-10T12:00:00Z'));
      expect(isPastDate('2025-04-10')).toBe(false); // today
      expect(isPastDate('2025-04-11')).toBe(false); // tomorrow
    });
  });

  describe('isValidDateRange', () => {
    it('returns true when start is before end', () => {
      expect(isValidDateRange('2025-01-10', '2025-01-11')).toBe(true);
    });

    it('returns false when start is equal to end', () => {
      expect(isValidDateRange('2025-01-10', '2025-01-10')).toBe(false);
    });

    it('returns false when start is after end', () => {
      expect(isValidDateRange('2025-01-11', '2025-01-10')).toBe(false);
    });
  });
});

