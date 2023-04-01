import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  rem,
  Container,
  Grid,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Cat } from './types';
import RatingSlider from './RatingSlider';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

const CatCard = ({ image, title, description, country, badges }: BadgeCardProps) => {
  const { classes, theme } = useStyles();
  const [cat, setCat] = useState<Cat>();
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    fetchCat();
  }, []);


  const fetchCat = () => {
    setRequesting(true);

    fetch("/api/cats/random")
      .then(res => res.json())
      .then(data => {
        setCat(data);
        console.log(data);
        setRequesting(false);
      })
  };

  const handleSubmit = (value: number) => {
    console.log(value);
  };


  return (
    <Container>
      {!cat && requesting && <Text size="xl" color="gray">Loading...</Text>}
      {
        cat &&
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={cat.image} alt={cat.name} height={rem(600)} />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text fz="lg" fw={500}>
                Meet {cat.name} &#128075;!
              </Text>
              <Badge size="sm">Breed: {cat.type}</Badge>
            </Group>
            <Text mt="md" className={classes.label} c="dimmed">
              Perfect for you, if you enjoy:
            </Text>
            <Group spacing={7} mt={5}>
              {cat.funfact}
            </Group>
          </Card.Section>
          <Card.Section className={classes.section} mt="md">
              <Grid>
                <Grid.Col xs={4}>
                  <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                    Cuteness Score
                  </Text>
                  <Text weight={700} size="xl">
                    {cat.average_rating}
                  </Text>
                </Grid.Col>
                <Grid.Col xs={8}>
                  <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                    Your rating
                  </Text>
                  <RatingSlider handleSliderValue={handleSubmit} />
                </Grid.Col>
              </Grid>
            </Card.Section>
        </Card>
      }
    </Container>
  )
};

export default CatCard;