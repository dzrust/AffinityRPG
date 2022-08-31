import { FC, Fragment, lazy, Suspense } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faScroll,
  faHelmetBattle,
  faBalanceScale,
  IconDefinition,
  faHoodCloak,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faHome as faHomeRegular,
  faScroll as faScrollRegular,
  faHelmetBattle as faHelmetBattleRegular,
  faBalanceScale as faBalanceScaleRegular,
  faHoodCloak as faHoodCloakRegular,
} from "@fortawesome/pro-regular-svg-icons";
import { ROUTES, ROUTES_ARRAY } from "@affinity-rpg/models/routes";
import { STAGES } from "@affinity-rpg/models/hero";

const LazyHome = lazy(() => import("./views/home/home"));
const LazyHeroes = lazy(() => import("./views/heroes/heroes"));
const LazyLegends = lazy(() => import("./views/legends/legends"));
const LazySettings = lazy(() => import("./views/settings/settings"));
const LazyBackToHome = lazy(() => import("./views/home/404"));
const LazyHeroHOC = lazy(() => import("../../../libraries/components/src/components/hero/hero-hoc"));
const LazyHeroBuilder = lazy(() => import("./views/hero-builder/hero-builder"));
const LazyDiceRoller = lazy(() => import("./views/dice-roller/dice-roller"));
const LazyMasteryHOC = lazy(() => import("../../../libraries/components/src/components/mastery/mastery-hoc"));
const LazyMasteryEditor = lazy(() => import("./views/hero-builder/stages/mastery-editor"));
const LazyItemHOC = lazy(() => import("../../../libraries/components/src/components/item/item-hoc"));
const LazyItemEditor = lazy(() => import("./views/hero-builder/stages/item-editor"));
const LazyAdminHeroes = lazy(() => import("./views/admin/admin-heroes"));
const LazyMarkdownPage = lazy(() => import("./views/rules/markdown-page"));
const LazyKitchenSink = lazy(() => import("@affinity-rpg/components/src/kitchen-sink"));
const LazyLegendHOC = lazy(() => import("../../../libraries/components/src/components/legend/legend-hoc"));
const LazyLegendSheet = lazy(() => import("./views/legend/legend"));
const LazyRollNotificationDisplay = lazy(
  () => import("../../../libraries/components/src/components/roll/roll-notifications"),
);
const LazyHeroSheet = lazy(() => import("./views/hero/hero"));

const routeIconTable = new Map<
  ROUTES,
  {
    text: string;
    activeIcon: IconDefinition;
    inactiveIcon: IconDefinition;
    href?: string;
    isActive: (path: string) => boolean;
  }
>();

const isRouteActive = (routeToCheck: string) => (currentPath: string) => currentPath.includes(routeToCheck);

routeIconTable.set(ROUTES.HOME, {
  text: "Home",
  inactiveIcon: faHomeRegular,
  activeIcon: faHome,
  isActive: (route) => route === ROUTES.HOME,
});
routeIconTable.set(ROUTES.LEGENDS, {
  text: "Legends",
  inactiveIcon: faScrollRegular,
  activeIcon: faScroll,
  isActive: isRouteActive(ROUTES.LEGENDS),
});
routeIconTable.set(ROUTES.HEROES, {
  text: "Heroes",
  inactiveIcon: faHelmetBattleRegular,
  activeIcon: faHelmetBattle,
  isActive: (path: string) =>
    isRouteActive(ROUTES.HEROES)(path) || isRouteActive(ROUTES.HERO)(path) || isRouteActive(ROUTES.HERO_BUILDER)(path),
});
routeIconTable.set(ROUTES.RULES, {
  text: "Rules",
  inactiveIcon: faBalanceScaleRegular,
  activeIcon: faBalanceScale,
  isActive: isRouteActive(ROUTES.RULES),
});
routeIconTable.set(ROUTES.USER, {
  text: "User",
  inactiveIcon: faHoodCloakRegular,
  activeIcon: faHoodCloak,
  isActive: isRouteActive(ROUTES.USER),
});

const AuthedRouter: FC = () => {
  const navLocation = useLocation();
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" fixed="bottom" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {ROUTES_ARRAY.map((route) => {
                const routeIcon = routeIconTable.get(route);
                if (!routeIcon) return null;
                return (
                  <Nav.Link as={Link} to={route} key={route} className="navigation__link">
                    <FontAwesomeIcon
                      icon={routeIcon.isActive(navLocation.pathname) ? routeIcon.activeIcon : routeIcon.inactiveIcon}
                      fixedWidth
                      className="navigation__link--icon"
                    />
                    <p className="navigation__link--text">{routeIcon.text}</p>
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="app__container">
        <Suspense>
          <LazyRollNotificationDisplay />
          <Routes>
            <Route path={ROUTES.HOME} element={<LazyHome />} />
            <Route path={ROUTES.HEROES} element={<LazyHeroes />} />
            <Route
              path={`${ROUTES.HERO}/:id`}
              element={
                <LazyHeroHOC>
                  <LazyHeroSheet isRollsAllowed />
                </LazyHeroHOC>
              }
            />
            <Route
              path={`${ROUTES.HERO_BUILDER}/:id/:stage`}
              element={<LazyHeroHOC children={<LazyHeroBuilder />} />}
            />
            <Route
              path={`${ROUTES.HERO_BUILDER}/:id/${STAGES.MASTERY}/:masteryId`}
              element={<LazyHeroHOC children={<LazyMasteryHOC children={<LazyMasteryEditor />} />} />}
            />
            <Route
              path={`${ROUTES.HERO_BUILDER}/:id/${STAGES.INVENTORY}/:itemId`}
              element={<LazyHeroHOC children={<LazyItemHOC children={<LazyItemEditor />} />} />}
            />
            <Route path={ROUTES.LEGENDS} element={<LazyLegends />} />
            <Route path={`${ROUTES.LEGENDS}/:id`} element={<LazyLegendHOC children={<LazyLegendSheet />} />} />
            <Route path={`${ROUTES.RULES}`} element={<LazyMarkdownPage />} />
            <Route path={`${ROUTES.RULES}/*`} element={<LazyMarkdownPage />} />
            <Route path={ROUTES.USER} element={<LazySettings />} />
            <Route path={ROUTES.DICE_ROLLER} element={<LazyDiceRoller />} />
            <Route path={ROUTES.KITCHEN_SINK} element={<LazyKitchenSink />} />
            <Route path={`${ROUTES.ADMIN}${ROUTES.HEROES}`} element={<LazyAdminHeroes />} />
            <Route path="*" element={<LazyBackToHome />} />
          </Routes>
        </Suspense>
      </Container>
    </Fragment>
  );
};

export default AuthedRouter;
