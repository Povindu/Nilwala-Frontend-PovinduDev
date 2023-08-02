import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from './Firebase';
import Skeleton from '@mui/material/Skeleton';

const HomeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const querySnapshot = await getDocs(collection(firestore, "projects"));
      const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectList);
      setIsLoaded(true);
    }

    getProjects();
  }, []);

  const handleHover = (cardId, isHovered) => {
    if (isHovered) {
      setHoveredCardId(cardId);
    } else {
      setHoveredCardId(null);
    }
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#0C243C', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ paddingBottom: '75px' }}>
          <Typography variant="h3" sx={{ color: '#55C2C3', margin: 0 }}>Our Projects</Typography>
        </Box>
        {isLoaded ? (
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            {projects.map((pro) => (
              <Grid item key={pro.id} xs={12} sm={6} md={4} lg={4}>
                {console.log(pro)}
                <Card
                  onMouseEnter={() => handleHover(pro.id, true)}
                  onMouseLeave={() => handleHover(pro.id, false)}
                  sx={{
                    margin: '2px',
                    height: '300px',
                    width: '360px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    src={pro.image}
                    alt="Live from space album cover"
                    sx={{ height: '300px', scale: '1', transition: 'transform 0.3s ease' }}
                    style={{
                      transform: hoveredCardId === pro.id ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      left: 0,
                      width: '100%',
                      height: hoveredCardId === pro.id ? '100%' : '10%',
                      backgroundColor: `rgba(126, 140, 156, ${hoveredCardId === pro.id ? 0.5 : 1})`,
                      textAlign: 'center',
                      padding: '8px',
                      transition: 'height 0.3s ease',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center', // Align text vertically
                    }}
                  >
                    <Typography variant="h3" sx={{ color: '#fff', margin: 0 }}>
                      {pro.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
            <Box sx = {{ height:'100vh' }}>
            <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={true} />
            </Box>
            <Box sx={{ width: 300, height:'100vh' }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={true} />
          </Box><Box sx={{ width: 300, height:'100vh' }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={true} />
              </Box>
              </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomeProjects;
