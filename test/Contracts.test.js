import { describe, expect, it, vi } from 'vitest';
import { Contracts } from '../src/lib/Contracts.js';

class ContractError extends Error {}

describe('Contracts', () => {
  it('returns true when the condition passes', () => {
    expect(Contracts.VERIFY(true, 'ok')).toBe(true);
    expect(Contracts.REQUIRE(true, 'ok')).toBe(true);
    expect(Contracts.ENSURE(true, 'ok')).toBe(true);
    expect(Contracts.INVARIANT(true, 'ok')).toBe(true);
  });

  it('throws an error with the contract prefix when the condition fails', () => {
    expect(() => Contracts.VERIFY(false, 'failed')).toThrow('[VERIFY]failed');
    expect(() => Contracts.REQUIRE(false, 'failed')).toThrow('[REQUIRE]failed');
    expect(() => Contracts.ENSURE(false, 'failed')).toThrow('[ENSURE]failed');
    expect(() => Contracts.INVARIANT(false, 'failed')).toThrow('[INVARIANT]failed');
  });

  it('uses the supplied error class and custom properties', () => {
    expect(() =>
      Contracts.VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' }),
    ).toThrow(ContractError);

    try {
      Contracts.VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' });
    } catch (error) {
      expect(error).toMatchObject({
        message: '[VERIFY]failed',
        code: 'E_CONTRACT',
      });
    }
  });

  it('logs instead of throwing when no error class is supplied', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(Contracts.VERIFY(false, 'failed', null, { code: 'E_CONTRACT' })).toBe(false);
    expect(error).toHaveBeenCalledWith('[VERIFY]failed', { code: 'E_CONTRACT' });

    error.mockRestore();
  });

  it('skips debug checks when debug mode is disabled', () => {
    Contracts.DEBUG_MODE = false;

    expect(Contracts.VERIFY_DEBUG(false, 'failed')).toBe(false);
  });

  it('runs debug checks when debug mode is enabled', () => {
    Contracts.DEBUG_MODE = true;

    expect(() => Contracts.VERIFY_DEBUG(false, 'failed')).toThrow('[VERIFY_DEBUG]failed');

    Contracts.DEBUG_MODE = false;
  });

  it('sets debug mode from config', () => {
    Contracts.setConfig({debug: true});

    expect(Contracts.DEBUG_MODE).toBe(true);

    Contracts.DEBUG_MODE = false;
  });
});
