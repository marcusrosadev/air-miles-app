import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { MdMenu, MdClose, MdHome, MdLock, MdExitToApp } from "react-icons/md";
import theme from '../../theme';
import useAuth from '../../contexts/auth/useAuth';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const listItemStyles = {
  color: '#FFF',
  textDecoration: 'none',
  '&:visited': { color: '#FFF' },
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: 2
};

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down(720));

  const { logout } = useAuth();

  const handleLogout = () => {
    handleDrawerClose();
    logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
        style={{
          padding: isMobile ? '5px' : '10px',
          margin: isMobile ? '2px' : '10px',
        }}
        size='large'
      >
        <MdMenu />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#42a5f5'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MdClose color='white'/>
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem component={Link} to="/home" sx={listItemStyles} onClick={handleDrawerClose}>
            <MdHome />
            <ListItemText primary="Início" />
          </ListItem>
          <ListItem component={Link} to="/permissions" sx={listItemStyles} onClick={handleDrawerClose}>
            <MdLock />
            <ListItemText primary="Permissões" />
          </ListItem>
          {/* <ListItem component={Link} to="/configurations" sx={listItemStyles} onClick={handleDrawerClose}>
            <MdEngineering />
            <ListItemText primary="Configurações" />
          </ListItem> */}
          <ListItem component={Link} to="/" sx={listItemStyles} onClick={handleLogout}>
            <MdExitToApp />
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
