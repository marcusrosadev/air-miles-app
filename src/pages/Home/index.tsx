import { Card, Grid, CardContent, Typography, Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import MonthlyUsers from '../../components/Graphics/MonthlyUsers';
import OffersClicked from '../../components/Graphics/OffersClicked';
import { MdReadMore } from "react-icons/md";

const Home = () => {
  const [openMonthlyUsers, setOpenMonthlyUsers] = useState(false);
  const [openOffersClicked, setOpenOffersClicked] = useState(false);

  return (
    <Box sx={{ padding: '20px 80px 20px 20px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid #90caf9', boxShadow: '0 3px 6px rgba(0,0,0,0.1)'}}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#1e88e5' }}>
                Usuários por mês
              </Typography>
              <MonthlyUsers />
              <IconButton
                onClick={() => setOpenMonthlyUsers(!openMonthlyUsers)}
                aria-expanded={openMonthlyUsers}
                aria-label="show more"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <MdReadMore size={30}/>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#000', marginBottom: 0 }}>
                  Ver Mais
                </Typography>
              </IconButton>
              <Collapse in={openMonthlyUsers} timeout="auto" unmountOnExit>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mês</TableCell>
                      <TableCell>Usuários</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Adicione os dados da tabela aqui */}
                    <TableRow>
                      <TableCell>Janeiro</TableCell>
                      <TableCell>1000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fevereiro</TableCell>
                      <TableCell>1200</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid green', boxShadow: '0 3px 6px rgba(0,0,0,0.1)'}}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'green' }}>
                Cliques por pacote/oferta
              </Typography>
              <OffersClicked />
              <IconButton
                onClick={() => setOpenOffersClicked(!openOffersClicked)}
                aria-expanded={openOffersClicked}
                aria-label="show more"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <MdReadMore size={30}/>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#000', marginBottom: 0 }}>
                  Ver Mais
                </Typography>
              </IconButton>
              <Collapse in={openOffersClicked} timeout="auto" unmountOnExit>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pacote/Oferta</TableCell>
                      <TableCell>Cliques</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Adicione os dados da tabela aqui */}
                    <TableRow>
                      <TableCell>Pacote A</TableCell>
                      <TableCell>300</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pacote B</TableCell>
                      <TableCell>450</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
