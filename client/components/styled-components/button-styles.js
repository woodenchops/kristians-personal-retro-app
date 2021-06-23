import styled from 'styled-components';
import CustomLink from '../CustomLink';

export const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || '#ef145a'};
  padding: 10px 20px;
  border-radius: 3px;
  color: #fff;
  border: none;
`;

export const StyledLink = styled(CustomLink)`
  background-color: ${(props) => props.backgroundColor || '#ef145a'};
  padding: 10px 20px;
  border-radius: 3px;
  color: #fff;
  border: none;
`;

export const ViewRetroLink = styled(StyledLink)`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
`;
