import styled from 'styled-components';

export const BaseButton = styled.button`
border: none;
padding: 15px 45px 15px 45px;
text-align: center;
text-decoration: none;
display: flex;
font-size: 16px;
transition-duration: 0.4s;
cursor: pointer;
border-radius: 25px;

  &:hover {
    background-color: white;
    color: black;
    // border: 1px solid black;
  }

  &.google-sign-in {
    background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #000000;
      border: none;
    }
  }

  &.inverted {
    background-color: rgb(129, 179, 53);
    color: rgb(255, 255, 255);
    // border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:hover{
    background-color: #357ae8;
    border: none;

  }
`;

export const InvertedButton = styled(BaseButton)`
background-color: grey;
color: black;
//border: 1px solid black;


&:hover{
  background-color: black;
  color: white;
  border: none;

}
`;

