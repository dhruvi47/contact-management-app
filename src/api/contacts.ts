// // src/api/contacts.ts

// import { useQuery, useMutation } from 'react-query';

// // Define API endpoints and methods here
// const API_BASE_URL = 'http://api.example.com'; // Replace with your API base URL

// export const useGetContacts = () => {
//   return useQuery('contacts', async () => {
//     const response = await fetch(`${API_BASE_URL}/contacts`);
//     const data = await response.json();
//     return data;
//   });
// };

// export const useCreateContact = () => {
//   return useMutation((newContact) => {
//     return fetch(`${API_BASE_URL}/contacts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newContact),
//     });
//   });
// };

// // Similar functions can be created for update and delete operations

export {}