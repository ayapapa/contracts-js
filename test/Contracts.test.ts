import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { Contracts, type Config, type ConfigKey, type LogProvider } from '../src/index.ts';

const { REQUIRE, REQUIRE_DEBUG, VERIFY, VERIFY_DEBUG, ENSURE, ENSURE_DEBUG, INVARIANT, INVARIANT_DEBUG,
  setConfig, getConfig, getDefaultConfig, resetConfig
 } = Contracts;

class ContractError extends Error {
  constructor(msg: string, param?: unknown, props?: unknown) {
    super(msg);
    Object.assign(this, param, props);
  }
}

class ErrorWithOptions extends Error {
  options: unknown;

  constructor(message: string, options?: unknown) {
    super(message);
    this.options = options;
  }
}

beforeEach(() => {
  vi.restoreAllMocks();
  resetConfig();
});


describe('Contracts', () => {

  it('returns true when the condition passes', () => {
    expect(VERIFY(true, 'ok')).toBe(true);
    expect(REQUIRE(true, 'ok')).toBe(true);
    expect(ENSURE(true, 'ok')).toBe(true);
    expect(INVARIANT(true, 'ok')).toBe(true);
  });

  it('throws an error with the contract prefix when the condition fails', () => {
    expect(() => VERIFY(false, 'failed')).toThrow('[VERIFY] failed');
    expect(() => REQUIRE(false, 'failed')).toThrow('[REQUIRE] failed');
    expect(() => ENSURE(false, 'failed')).toThrow('[ENSURE] failed');
    expect(() => INVARIANT(false, 'failed')).toThrow('[INVARIANT] failed');
  });

  it('uses the supplied error class and custom properties', () => {
    expect(() =>
      VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' }),
    ).toThrow(ContractError);

    try {
      VERIFY(false, 'failed', ContractError, { code: 'E_CONTRACT' });
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
      VERIFY(
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
      REQUIRE(false, 'failed', ErrorWithOptions, { code: 'E_REQUIRE' });
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorWithOptions);
      expect(error).toMatchObject({
        message: '[REQUIRE] failed',
      });
      expect((error as ErrorWithOptions).options).toMatchObject({
        code: 'E_REQUIRE',
      });
    }
  });

  it('logs instead of throwing when no error class is supplied', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(VERIFY(false, 'failed', null, { code: 'E_CONTRACT' })).toBe(false);
    expect(error).toHaveBeenCalledWith('[VERIFY] failed', { code: 'E_CONTRACT' });
  });

  it('skips debug checks when debug mode is disabled', () => {
    expect(VERIFY_DEBUG(false, 'failed')).toBe(false);
    expect(REQUIRE_DEBUG(false, 'failed')).toBe(false);
    expect(ENSURE_DEBUG(false, 'failed')).toBe(false);
    expect(INVARIANT_DEBUG(false, 'failed')).toBe(false);
  });

  it('runs debug checks when debug mode is enabled', () => {
    setConfig({ debug: true });

    expect(() => VERIFY_DEBUG(false, 'failed')).toThrow('[VERIFY_DEBUG] failed');
    expect(() => REQUIRE_DEBUG(false, 'failed')).toThrow('[REQUIRE_DEBUG] failed');
    expect(() => ENSURE_DEBUG(false, 'failed')).toThrow('[ENSURE_DEBUG] failed');
    expect(() => INVARIANT_DEBUG(false, 'failed')).toThrow('[INVARIANT_DEBUG] failed');
  });

  it('sets config with reset=false', () => {
    const logger: LogProvider = { error: vi.fn() };
    setConfig({ debug: true, logger });
    expect(Contracts.DEBUG_MODE).toBeTruthy();
    expect(getConfig().debug).toBeTruthy();
    expect(getConfig().logger).toBe(logger);

    setConfig({ debug: false }, false);
    expect(Contracts.DEBUG_MODE).toBeFalsy();
    expect(getConfig().debug).toBeFalsy();
    expect(getConfig().logger).toBe(logger);
  });

  it('sets config null values', () => {
    //const logger: LogProvider = { error: vi.fn() };
    setConfig({ debug: undefined, logger: undefined } as unknown as Config); // Forced type cast due to undefined specification.
    expect(Contracts.DEBUG_MODE).toBe(getDefaultConfig().debug);
    expect(getConfig().debug).toBe(getDefaultConfig().debug);
    expect(getConfig().logger).toBe(getDefaultConfig().logger);

    setConfig({ debug: null, logger: null } as unknown as Config); // Forced type cast due to null specification.
    expect(Contracts.DEBUG_MODE).toBe(getDefaultConfig().debug);
    expect(getConfig().debug).toBe(getDefaultConfig().debug);
    expect(getConfig().logger).toBe(getDefaultConfig().logger);
  });


  it('sets debug mode from config', () => {
    setConfig({ debug: true });
    expect(Contracts.DEBUG_MODE).toBeTruthy();

    Contracts.DEBUG_MODE = false;
    expect(Contracts.DEBUG_MODE).toBeFalsy();
    expect(getConfig().debug).toBeFalsy();
  });

  it('sets undefined config', () => {
    setConfig({ debug: false });

    expect(Contracts.DEBUG_MODE).toBeFalsy();
  });

  it('uses the configured logger when no error class is supplied', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };

    setConfig({ logger });

    const param = { code: 'E_REQUIRE' };
    const props = { code: 'HOGEHOGE' };
    
    expect(REQUIRE(false, 'failed', null, param, props)).toBeFalsy();
    expect(logger.error).toHaveBeenCalledWith('[REQUIRE] failed', param, props);
  });

  it('get default config', () => {
    const config = getDefaultConfig();
    expect(config.debug).toBeFalsy();
    expect(config.logger).toBe(console);
  });

  it('reset config', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };
    setConfig({ debug: true, logger });
    expect(getConfig().debug).toBeTruthy();
    expect(getConfig().logger).toBe(logger);

    resetConfig();
    expect(getConfig().debug).toBe(getDefaultConfig().debug);
    expect(getConfig().logger).toBe(getDefaultConfig().logger);
  });

  it('resets to console logger when logger is omitted from config', () => {
    const logger: LogProvider = {
      error: vi.fn(),
    };
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    setConfig({ logger });
    resetConfig();

    expect(ENSURE(false, 'failed', null)).toBe(false);
    expect(logger.error).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith('[ENSURE] failed');
  });

  it('does not log empty failure messages when throwing is suppressed', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(INVARIANT(false, null, null)).toBe(false);
    expect(error).not.toHaveBeenCalled();
  });

  it('exports public types', () => {
    expectTypeOf<Config>().toEqualTypeOf<{ debug?: boolean; logger?: LogProvider }>();
    expectTypeOf<ConfigKey>().toEqualTypeOf<'debug' | 'logger'>();
  });

});
