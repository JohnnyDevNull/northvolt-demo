import { IServerResponse } from '@northvolt/shared';
import { useEffect, useState } from 'react';
import { getRequest } from '../../util/http-request.function';

const initialServerMessageState: IServerResponse | null = null;
const initialErrorState: string | null = null;

export default function ServerHello() {
  const [serverMessage, setServerMessage] = useState(initialServerMessageState);
  const [error, setError] = useState(initialErrorState);

  /**
   * Note: the empty deps array [] means
   * this useEffect will run once
   * similar to componentDidMount()
   */
  useEffect(() => {
    getRequest<IServerResponse>({ path: null })
      .then(result => setServerMessage(result))
      .catch(() => setError('Error while requesting API'));
  }, []);

  return (
    <div>
      {error && <span>{error}</span>}
      {serverMessage && <pre>{JSON.stringify(serverMessage, null, 2)}</pre>}
    </div>
  );
}
