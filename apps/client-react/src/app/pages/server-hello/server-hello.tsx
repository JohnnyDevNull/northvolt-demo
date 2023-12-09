import { IServerResponse } from '@northvolt/shared';
import { useEffect, useState } from 'react';

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
    fetch('/api')
      .then(res => res.json())
      .then((result: IServerResponse) => setServerMessage(result))
      .catch((error: Error) => setError('Error while requesting API'));
  }, []);

  return (
    <div>
      {error && <span>{error}</span>}
      {serverMessage && <pre>{JSON.stringify(serverMessage, null, 2)}</pre>}
    </div>
  );
}
