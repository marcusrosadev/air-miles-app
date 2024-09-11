import { Card, Grid2, CardContent, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import MonthlyUsers from '../../components/Graphics/MonthlyUsers';
import OffersClicked from '../../components/Graphics/OffersClicked';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid2 container spacing={3}>
        <Grid2 size={{xs:12, md:isMobile ? 12 : 6}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usuários por mês
              </Typography>
              <MonthlyUsers />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{xs:12, md:isMobile ? 12 : 6}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cliques por pacote/oferta
              </Typography>
              <OffersClicked />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
