import http from 'k6/http';
import { check, sleep } from 'k6';

// vrai token du user test 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjYmZhYTg5Zjc3MjNjMWRkZjJkMiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc2NjM2MTUwOCwiZXhwIjoxNzY2MzY4NzA4fQ.CY_56dVM4gGS6abep69vAK09GL7WB3yUK-oZxEcorCI";
export const options = {
  vus: 50,
  duration: '10s'
};

export default function () {
  const res = http.get('http://localhost:3000/api/inventory/me/plants', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}