import { useState } from "react";

import * as S from "./styles";
import { IoMdExit } from "react-icons/io";

import { Button } from "@mui/material";

import { useAuth } from "@/contexts/AuthProvider";
import { IMenuData, menusData } from "@/data/menusData";

const Dashboard = () => {
  const { logout } = useAuth();

  const [activeView, setActiveView] = useState<IMenuData>(menusData[1]);

  return (
    <S.DashboardPage>
      <S.DashboardHeader>
        <S.DashboardHeaderLogo>
          <h1>ALERTAS TSM</h1>
        </S.DashboardHeaderLogo>
        <S.DashboardHeaderSettings>
          <Button variant="outlined" startIcon={<IoMdExit />} onClick={logout}>
            Sair
          </Button>
        </S.DashboardHeaderSettings>
      </S.DashboardHeader>
      <S.DashboardWrapper>
        <S.DashboardMenu>
          {menusData.map((menu: IMenuData) => {
            if (!menu.menuActive) return null;

            const isActiveView = activeView.menuId === menu.menuId;

            return (
              <Button
                key={menu.menuId}
                disabled={menu.menuBlocked}
                variant={isActiveView ? "contained" : "outlined"}
                onClick={() => setActiveView(menu)}
              >
                {menu.menuLabel}
              </Button>
            );
          })}
        </S.DashboardMenu>
        <S.DashboardViewsWrapper>
          {activeView.menuViewRender}
        </S.DashboardViewsWrapper>
      </S.DashboardWrapper>
    </S.DashboardPage>
  );
};

export default Dashboard;
