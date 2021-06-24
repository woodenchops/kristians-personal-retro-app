import styled from 'styled-components';
import CustomLink from '../CustomLink';

export const BaseButton = styled.button`
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
`;

export const StyledButton = styled(BaseButton)`
  background-color: ${(props) => props.backgroundColor || '#ef145a'};
  color: #fff;
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
