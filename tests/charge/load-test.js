import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 200, //cmb de user simultane
  duration: '15s'
};

export default function () {
  const payload = {
    email: 'fakeTest@example.com',
    password: 'wrongpasswordBro'
  };

  const res = http.post('http://localhost:3000/api/auth/login', payload);

  //pour verifier que le status est bien 401 ou 429
  check(res, {
    'status is 401 or 429': (r) => r.status === 401 || r.status === 429,
  });

  sleep(0.2);
}
