import styled from "styled-components";

const headerHeight = "60px";
const menuWidth = "200px";

export const DashboardPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  height: ${headerHeight};

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

export const DashboardHeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${menuWidth};
  height: 100%;
  padding: 0 20px;

  h1 {
    font-size: 20px;
    line-height: 20px;
    font-weight: 900;

    color: rgba(0, 0, 0, 0.8);
  }

  border-right: 1px solid rgba(0, 0, 0, 0.25);
`;

export const DashboardHeaderSettings = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - ${menuWidth});
  height: 100%;
  padding: 10px 20px;
`;

export const DashboardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${headerHeight});
`;

export const DashboardMenu = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: ${menuWidth};
  height: 100%;
  padding: 20px;

  border-right: 1px solid rgba(0, 0, 0, 0.25);
`;

export const DashboardViewsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - ${menuWidth});
  height: 100%;
  padding: 20px;
`;
