

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button, Card, Text, Title, Container, TextInput } from '@mantine/core';

const GET_USERS = gql`
  query GetUsers {
    users {  
      id
      username
      email
    }
  }
`;

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
  
  const { loading: usersLoading, error: usersError, data: usersData, refetch: refetchUsers } = useQuery(GET_USERS);
  
  const { loading: userLoading, error: userError, data: userData, refetch: refetchUser } = useQuery(GET_USER, {
    variables: { id: userId ? parseInt(userId) : null }, 
    skip: !userId, 
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
