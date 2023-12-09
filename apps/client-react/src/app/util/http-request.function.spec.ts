import { describe, expect, it } from 'vitest';
import { deleteRequest, getRequest, patchRequest, postRequest } from './http-request.function';

(global.fetch as unknown) = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

describe('http-request.function', () => {
  describe('getRequest', () => {
    it('should call fetch with the expected params for root path', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await getRequest({ path: null });
      expect(fetchSpy).toHaveBeenCalledWith('/api', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: undefined,
      });
      expect(result).toStrictEqual({});
    });

    it('should call fetch with the expected params for specific path', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await getRequest({ path: 'todo' });
      expect(fetchSpy).toHaveBeenCalledWith('/api/todo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: undefined,
      });
      expect(result).toStrictEqual({});
    });
  });

  describe('postRequest', () => {
    it('should call fetch with the expected params', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await postRequest({ path: 'todo/1-2-3', body: { a: 'a', b: 2 } });
      expect(fetchSpy).toHaveBeenCalledWith('/api/todo/1-2-3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 'a', b: 2 }),
      });
      expect(result).toStrictEqual({});
    });
  });

  describe('patchRequest', () => {
    it('should call fetch with the expected params', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await patchRequest({ path: 'todo/1-2-3', body: { d: 'd', e: 3 } });
      expect(fetchSpy).toHaveBeenCalledWith('/api/todo/1-2-3', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ d: 'd', e: 3 }),
      });
      expect(result).toStrictEqual({});
    });
  });

  describe('deleteRequest', () => {
    it('should call fetch with the expected params', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const result = await deleteRequest({ path: 'todo/1-2-3' });
      expect(fetchSpy).toHaveBeenCalledWith('/api/todo/1-2-3', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(result.json).toBeDefined();
    });
  });
});
