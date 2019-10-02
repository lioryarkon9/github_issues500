import React from 'react';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';
import CreateButton from 'components/CreateButton';

const LoginView = () => (
  <RouteWrapper>
    <LoginTitle>Login</LoginTitle>
    <FormInputsContainer>
      <SingleInput />
      <SingleInput type="password" />
      <CreateButton>LOGIN</CreateButton>
    </FormInputsContainer>
  </RouteWrapper>
);

const SingleInput = styled.input`
  width: 25vw;
  font-size: 1.2em;
  margin-bottom: 2%;
  padding: 1%;
`;

const FormInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h1`
  text-align: center;
`;

export default LoginView;
