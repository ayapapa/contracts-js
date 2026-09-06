import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { Contracts, type Config, type ConfigKey, type LogProvider } from '../src/index';

class ContractError extends Error {}

class ErrorWithOptions extends Error {
  options: unknown;

  constructor(message: string, options?: unknown) {
    super(message);
    this.options = options;
  }
}

beforeEach(() => {
  vi.restoreAllMocks();
  Contracts.resetConfig();
});


describe('Contracts', () => {

  it('returns true when the condition passes', () => {
    expect(Contracts.VERIFY(true, 'ok')).toBe(true);
    expect(Contracts.REQUIRE(true, 'ok')).toBe(true);
    expect(Contracts.ENSURE(true, 'ok')).toBe(true);
    expect(Contracts.INVARIANT(true, 'ok')).toBe(true);
  });

  it('throws an error with the contract prefix when the condition fails', () => {
    expect(() => Contracts.VERIFY(false, 'failed')).toThrow('[VERIFY] failed');
    expect(() => Contracts.REQUIRE(false, 'failed')).toThrow('[REQUIRE] failed');
    expect(() => Contracts.ENSURE(false, 'failed')).toThrow('[ENSURE] failed');
    expect(() => Contracts.INVARIANT(false, 'failed')).toThrow('[INVARIANT] failed');
  });

  it('uses the supplied error class and custom properties', () => {
    expect(() =>
      Contracts.VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' }),
    ).toThrow(ContractError);

    try {
      Contracts.VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' });
    } catch (error) {
      expect(error).toMatchObject({
        message: '[VERIFY] failed',
        code: 'E_CONTRACT',
      });
    }
  });

  it('passes constructor options to the supplied error class and assigns custom properties', () => {
    expect.assertions(2);

    try {
      Contracts.VERIFY(
        false,
        'failed',
        ErrorWithOptions,
        { cause: 'root-cause' },
        { code: 'E_CONTRACT' },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorWithOptions);
      expect(error).toMatchObject({
        message: '[VERIFY] failed',
        options: { cause: 'root-cause' },
        code: 'E_CONTRACT',
      });
    }
  });

  it('keeps the fourth argument compatible as custom properties', () => {
    expect.assertions(3);

    try {
      Contracts.REQUIRE(false, 'failed', ErrorWithOptions, { code: 'E_REQUIRE' });
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorWithOptions);
      expect(error).toMatchObject({
        message: '[REQUIRE] failed',
        code: 'E_REQUIRE',
      });
      expect((error as ErrorWithOptions).options).toBeUndefined();
    }
  });

  it('logs instead of throwing when no error class is supplied', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(Contracts.VERIFY(false, 'failed', null, { code: 'E_CONTRACT' })).toBe(false);
    expect(error).toHaveBeenCalledWith('[VERIFY] failed', { code: 'E_CONTRACT' });
  });

  it('skips debug checks when debug mode is disabled', () => {
    expect(Contracts.VERIFY_DEBUG(false, 'failed')).toBe(false);
    expect(Contracts.REQUIRE_DEBUG(false, 'failed')).toBe(false);
    expect(Contracts.ENSURE_DEBUG(false, 'failed')).toBe(false);
    expect(Contracts.INVARIANT_DEBUG(false, 'failed')).toBe(false);
  });

  it('runs debug checks when debug mode is enabled', () => {
    Contracts.setConfig({ debug: true });

    expect(() => Contracts.VERIFY_DEBUG(false, 'failed')).toThrow('[VERIFY_DEBUG] failed');
    expect(() => Contracts.REQUIRE_DEBUG(false, 'failed')).toThrow('[REQUIRE_DEBUG] failed');
    expect(() => Contracts.ENSURE_DEBUG(false, 'failed')).toThrow('[ENSURE_DEBUG] failed');
    expect(() => Contracts.INVARIANT_DEBUG(false, 'failed')).toThrow('[INVARIANT_DEBUG] failed');
  });

  it('sets config with reset=false', () => {
    const logger: LogProvider = { error: vi.fn() };
    Contracts.setConfig({ debug: true, logger });
    expect(Contracts.DEBUG_MODE).toBeTruthy();
    expect(Contracts.getConfig().debug).toBeTruthy();
    expect(Contracts.getConfig().logger).toBe(logger);

    Contracts.setConfig({ debug: false }, false);
    expect(Contracts.DEBUG_MODE).toBeFalsy();
    expect(Contracts.getConfig().debug).toBeFalsy();
    expect(Contracts.getConfig().logger).toBe(logger);
  });

  it('sets config null values', () => {
    const logger: LogProvider = { error: vi.fn() };
    Contracts.setConfig({ debug: undefined, logger: undefined });
    expect(Contracts.DEBUG_MODE).toBe(Contracts.getDefaultConfig().debug);
    expect(Contracts.getConfig().debug).toBe(Contracts.getDefaultConfig().debug);
    expect(Contracts.getConfig().logger).toBe(Contracts.getDefaultConfig().logger);

    Contracts.setConfig({ debug: null, logger: null } as any); // Forced type cast due to null specification.
    expect(Contracts.DEBUG_MODE).toBe(Contracts.getDefaultConfig().debug);
    expect(Contracts.getConfig().debug).toBe(Contracts.getDefaultConfig().debug);
    expect(Contracts.getConfig().logger).toBe(Contracts.getDefaultConfig().logger);
  });


  it('sets debug mode from config', () => {
    Contracts.setConfig({ debug: true });
    expect(Contracts.DEBUG_MODE).toBeTruthy();

    Contracts.DEBUG_MODE = false;
    expect(Contracts.DEBUG_MODE).toBeFalsy();
    expect(Contracts.getConfig().debug).toBeFalsy();
  });

  it('sets undefined config', () => {
    Contracts.setConfig({ debug: false });

    expect(Contracts.DEBUG_MODE).toBeFalsy();
  });

  it('uses the configured logger when no error class is supplied', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };

    Contracts.setConfig({ logger });

    expect(Contracts.REQUIRE(false, 'failed', null, { code: 'E_REQUIRE' })).toBeFalsy();
    expect(logger.error).toHaveBeenCalledWith('[REQUIRE] failed', { code: 'E_REQUIRE' });
  });

  it('get default config', () => {
    const config = Contracts.getDefaultConfig();
    expect(config.debug).toBeFalsy();
    expect(config.logger).toBe(console);
  });

  it('reset config', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };
    Contracts.setConfig({ debug: true, logger });
    expect(Contracts.getConfig().debug).toBeTruthy();
    expect(Contracts.getConfig().logger).toBe(logger);

    Contracts.resetConfig();
    expect(Contracts.getConfig().debug).toBe(Contracts.getDefaultConfig().debug);
    expect(Contracts.getConfig().logger).toBe(Contracts.getDefaultConfig().logger);
  });

  it('resets to console logger when logger is omitted from config', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {
      const i = 0;
    });

    Contracts.setConfig({ logger });
    Contracts.resetConfig();

    expect(Contracts.ENSURE(false, 'failed', null)).toBe(false);
    expect(logger.error).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith('[ENSURE] failed', {});
    expect(consoleError).toHaveBeenCalled();
  });

  it('does not log empty failure messages when throwing is suppressed', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(Contracts.INVARIANT(false, null, null)).toBe(false);
    expect(error).not.toHaveBeenCalled();
  });

  it('exports public types', () => {
    expectTypeOf<Config>().toEqualTypeOf<{ debug?: boolean; logger?: LogProvider }>();
    expectTypeOf<ConfigKey>().toEqualTypeOf<'debug' | 'logger'>();
  });

});
