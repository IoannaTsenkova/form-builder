import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('api/autofill', () => {
    return new HttpResponse(
      JSON.stringify({
        email: 'example@example.com',
        fullName: 'John Doe'
      }),
      { status: 200 }
    );
  })
];
