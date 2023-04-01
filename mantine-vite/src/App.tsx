import { Anchor, AppShell, ColorScheme, ColorSchemeProvider, Container, createStyles, Group, Header, MantineProvider, rem, Text, useMantineTheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import ColourSchemeToggle from './components/ColourSchemeToggle';
import CatCard from './components/CatCard';
import SubmitCat from './components/SubmitCat';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CatTable from './components/AllCats';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 40,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    paddingRight: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  mainLink: {
    textTransform: 'uppercase',
    fontSize: rem(13),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    padding: `${rem(7)} ${theme.spacing.sm}`,
    fontWeight: 700,
    borderBottom: `${rem(2)} solid transparent`,
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },
  mainLinkActive: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottomColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6],
  },
}));


const HEADER_HEIGHT = rem(84);


const links =
  [
    {
      "link": "/",
      "label": "See a cat!"
    },
    {
      "link": "/cats",
      "label": "See all cats!"
    },
    {
      "link": "/submit",
      "label": "Submit your cat!"
    }
  ];

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();


  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const mainItems = links.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={cx(classes.mainLink, { [classes.mainLinkActive]: index === active })}
      onClick={
        e => {
          setActive(index);
          // e.preventDefault();
        }
      }
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Router>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}>
          <AppShell
            styles={{
              main: {
                background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"

            header={
              <Header height={HEADER_HEIGHT} mb={120}>
                <Container className={classes.inner}>
                  <Anchor<'a'>
                  href={"/"}
                  onClick={
                    e => {
                      setActive(0);
                      e.preventDefault();
                    }
                  }
                  >
                  <Text className={classes.title} component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                    cats.
                  </Text>
                  </Anchor>
                  <div className={classes.links}>
                    <Group spacing={0} position="right" className={classes.mainLinks}>
                      {mainItems}
                      {/* <ColourSchemeToggle/> */}
                    </Group>
                  </div>
                </Container>
              </Header>
            }>
            <Routes>
              <Route path="/" element={<CatCard />} />
              <Route path="/submit" element={<SubmitCat />} />
              <Route path="/cats" element={<CatTable />} />
            </Routes>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider >
    </Router>
  )
}
export default App;