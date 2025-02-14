// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, clearUser } from '../slices/userSlice';

// const UserComponent = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.user?.data || null);
//     const status = useSelector((state) => state.user.status);
//     const error = useSelector((state) => state.user.error);

//     useEffect(() => {
//         dispatch(fetchUserById(1)); // Cargo el usuario con id 1 al montar el componente
//     }, [dispatch]);

//     return (
//         <div>
//             <h2>Usuario</h2>
//             {status === 'loading' && <p>Cargando...</p>}
//             {status === 'failed' && <p>Error: {error}</p>}
//             {status === 'succeeded' && user && (
//                 <div>
//                     <p>Nombre: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                 </div>
//             )}
//             <button onClick={() => dispatch(clearUser())}>Borrar Usuario</button>
//         </div>
//     );
// };

// export default UserComponent;

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Card, Text, Title, Container, TextInput } from '@mantine/core';

// ✅ Consulta para obtener todos los usuarios (debe coincidir con `users` en el backend)
const GET_USERS = gql`
  query GetUsers {
    users {  
      id
      username
      email
    }
  }
`;

// ✅ Consulta para obtener un usuario por ID (debe coincidir con `user` en el backend)
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {  
      id
      username
      email
    }
  }
`;

const UserComponent = () => {
  const [userId, setUserId] = useState('');

  // 🔹 Obtener todos los usuarios
  const { loading: usersLoading, error: usersError, data: usersData, refetch: refetchUsers } = useQuery(GET_USERS);

  // 🔹 Obtener un usuario por ID
  const { loading: userLoading, error: userError, data: userData, refetch: refetchUser } = useQuery(GET_USER, {
    variables: { id: userId ? parseInt(userId) : null }, 
    skip: !userId, // 🔹 Evita ejecutar la consulta sin ID válido
  });

  return (
    <Container>
      <Title order={1}>Buscar Usuario</Title>

      <TextInput
        label="ID del Usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        type="number"
        min="1"
      />

      <Button mt="md" onClick={() => refetchUser({ id: parseInt(userId) })}>
        Obtener Usuario
      </Button>

      {userLoading && <Text>Cargando usuario...</Text>}
      {userError && <Text color="red">Error: {userError.message}</Text>}

      {userData?.user && (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
          <Title order={2}>{userData.user.nombre}</Title>
          <Text>Email: {userData.user.email}</Text>
        </Card>
      )}

      <Title order={1} mt="xl">Lista de Usuarios</Title>

      <Button mt="md" onClick={() => refetchUsers()}>Actualizar Lista</Button>

      {usersLoading && <Text>Cargando usuarios...</Text>}
      {usersError && <Text color="red">Error: {usersError.message}</Text>}

      {usersData?.users && usersData.users.map((user) => (
        <Card key={user.id} shadow="sm" padding="lg" radius="md" withBorder mt="md">
          <Title order={2}>{user.nombre}</Title>
          <Text>Email: {user.email}</Text>
        </Card>
      ))}
    </Container>
  );
};

export default UserComponent;
