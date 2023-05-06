import { BsTrash3 } from 'react-icons/bs';
import styled from 'styled-components';

export const Container = styled.div `
  padding: 15px 30px;
  background-color: #f2f2f2;
`;

export const Title = styled.h2 `
  color: #333;
  margin-bottom: 10px;
`;

export const Row = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.label `
  flex-basis: 100px;
  margin-right: 10px;
  color: #666;
`;

export const Input = styled.input `
  flex-grow: 1;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  background-color: #f2f2f2;
  color: #333;
`;

export const Button = styled.button `
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

export const LineList = styled.ul `
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

export const LineItem = styled.li `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const TrashIcon = styled(BsTrash3)
`
	font-size: 18px;
	color: red;

	&:hover {
		cursor: pointer;
	}
`;