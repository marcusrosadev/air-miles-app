import styled from "styled-components";

export const PermissionsPage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 25px;
  border-radius: 10px;

  border: 1px solid rgba(0, 0, 0, 0.15);
`;

export const PermissionsPageContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: 1200px;

  /* border: 1px solid red; */
`;

export const PermissionsListOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 10px;
`;

export const PermissionsListNavigation = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const PermissionsListNavigationOptions = styled.div`
  display: flex;
  column-gap: 8px;

  .MuiInputBase-input {
    width: 240px;
    font-size: 15px;
  }
`;

export const PermissionsListHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
`;

export const ListHeaderLabel = styled.div`
  display: flex;
  margin-bottom: -10px;

  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);

  &:nth-of-type(1) {
    width: 20%;
  }

  &:nth-of-type(2) {
    width: 15%;
  }

  &:nth-of-type(3) {
    width: 15%;
  }

  &:nth-of-type(4) {
    width: 25%;
  }

  &:nth-of-type(5) {
    width: 5%;
  }

  &:nth-of-type(6) {
    width: 20%;
  }
`;

export const PermissionsList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
`;

export const PermissionCard = styled.div`
  display: flex;
  padding: 10px 15px;
  border-radius: 8px;

  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const PermissionCardLabel = styled.div`
  display: flex;

  font-size: 14px;

  &:nth-of-type(1) {
    width: 20%;
  }

  &:nth-of-type(2) {
    width: 15%;
  }

  &:nth-of-type(3) {
    width: 15%;
  }

  &:nth-of-type(4) {
    width: 25%;
  }

  &:nth-of-type(5) {
    width: 5%;
  }

  /* border: 1px solid red; */
`;

export const PermissionCardOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
`;

export const Option = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;

  background: none;
  border: none;
  outline: none;

  svg {
    font-size: 18px;
    transition: 0.3s;
    opacity: 0.7;
  }

  &:hover {
    background: none;
    svg {
      opacity: 0.95;
    }
  }
`;
