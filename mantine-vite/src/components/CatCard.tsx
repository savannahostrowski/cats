import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem, Container } from '@mantine/core';
import { Cat } from './types';
import { useEffect, useState } from 'react';
const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const CatCard = () => {
  const { classes } = useStyles();
  const [cat, setCat] = useState<Cat>();
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    fetchCat();
  }, []);


  const fetchCat = () => {
    setRequesting(true);

    fetch(`/api/cat`)
      .then(res => res.json())
      .then(data => {
        setCat(data);
        setRequesting(false);
      })
  };


  return (
    <Container>
      {!cat && requesting && <Text size="xl" color="gray">Loading...</Text>}
      {cat &&
        <Container>
          <h1>Rate {cat.name}!</h1>

          <Paper
            shadow="md"
            p="md"
            radius="md"
            sx={{ backgroundImage: `url(${cat.image})` }}
            className={classes.card}
          >
            <div>
              <Text className={classes.category} size="xs">
                {cat.type}
              </Text>
              <Title order={3} className={classes.title}>
                {cat.name}
              </Title>
            </div>
            <Text className={classes.category} size="xs">
              {cat?.funfact}
            </Text>
          </Paper>
        </Container>
      }
    </Container>
  );
}

export default CatCard;
