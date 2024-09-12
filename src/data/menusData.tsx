import { Home, Permissions, Settings } from "@/views";

export type ViewsType =
  | "menu-home"
  | "menu-permissions"
  | "menu-users"
  | "menu-settings";

export interface IMenuData {
  menuId: ViewsType;
  menuLabel: string;
  menuIcon: React.ReactNode;
  menuViewRender: React.ReactNode;
  menuActive: boolean;
  menuBlocked: boolean;
}

const menusData: IMenuData[] = [
  {
    menuId: "menu-home",
    menuLabel: "Home",
    menuIcon: <></>,
    menuViewRender: <Home />,
    menuActive: true,
    menuBlocked: false,
  },
  {
    menuId: "menu-permissions",
    menuLabel: "Permissões",
    menuIcon: <></>,
    menuViewRender: <Permissions />,
    menuActive: true,
    menuBlocked: false,
  },
  {
    menuId: "menu-users",
    menuLabel: "Usuários",
    menuIcon: <></>,
    menuViewRender: <></>,
    menuActive: true,
    menuBlocked: true,
  },
  {
    menuId: "menu-settings",
    menuLabel: "Configurações",
    menuIcon: <></>,
    menuViewRender: <Settings />,
    menuActive: true,
    menuBlocked: true,
  },
];

export { menusData };
