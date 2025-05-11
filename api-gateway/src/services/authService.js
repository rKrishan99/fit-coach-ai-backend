import fetch from "node-fetch";

export const registerUser = async (email, password, name, profileImage, role) => {
  const response = await fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation Register(
          $email: String!, 
          $password: String!,
          $name: String!,
          $profileImage: String!,
          $role: String!
        ) {
          register(
            email: $email, 
            password: $password,
            name: $name,
            profileImage: $profileImage,
            role: $role
          ) {
            token
            user {
              id
              email
              name
              profileImage
              role
            }
          }
        }
      `,
      variables: { email, password, name, profileImage, role },
    }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.register;
};
