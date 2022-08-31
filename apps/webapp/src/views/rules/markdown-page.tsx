import { useMemo } from "react";
import { Card, Container, Nav, NavDropdown, Table } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import V01Routes from "../../rules-routes/0.1.json";
import { ROUTES } from "@affinity-rpg/models/routes";
import { VERSION } from "@affinity-rpg/models/versions";
import { useGetRulesQuery } from "@affinity-rpg/data/api/rules";
import { setVersion } from "@affinity-rpg/data/slices/appSlice";
import { useAppState, useAppDispatch } from "@affinity-rpg/hooks/src/hooks";

const MarkdownPage = () => {
  const { version } = useAppState();
  const dispatch = useAppDispatch();
  let route = useLocation().pathname.replace(ROUTES.RULES, "");
  if (route.length === 0) {
    route = "/";
  }
  const navigate = useNavigate();
  const { data: rules, isLoading } = useGetRulesQuery(version);
  const markdown = useMemo(() => {
    if (!isLoading && (!rules || rules.length === 0)) {
      navigate("/404");
      return "";
    }
    if (!rules) {
      return "";
    }
    const page = rules[0].pages.find((page) => page.path === route.toLowerCase());
    if (!page) {
      navigate("/404");
      return "";
    }
    return atob(page.document);
  }, [rules, route, version]);
  const transformLinkUri = (href: string) => {
    let serializedHref = href;
    if (serializedHref.charAt(serializedHref.length - 1) === "/") {
      serializedHref = serializedHref.substring(0, serializedHref.length - 1);
    }
    return `${ROUTES.RULES}/${serializedHref}`;
  };
  return (
    <Container>
      <Nav onSelect={(selectedKey) => alert(`selected ${selectedKey}`)} variant="tabs" className="mt-3">
        {V01Routes.routes.map((v1Route) => {
          return (
            <Nav.Link
              as={Link}
              to={`${ROUTES.RULES}${v1Route.to}`}
              active={route.includes(v1Route.to)}
              key={v1Route.to}
              className="navigation__link"
            >
              <p className="navigation__link--text">{v1Route.label}</p>
            </Nav.Link>
          );
        })}
        <NavDropdown title={`Version: ${version}`} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => dispatch(setVersion(VERSION.LATEST))}>Latest</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <ReactMarkdown
        children={`${markdown}`}
        remarkPlugins={[remarkGfm]}
        transformLinkUri={transformLinkUri}
        components={{
          a: ({ node, ...props }) => <Link to={props.href ?? "/404"} className="btn-link" {...props} />,
          table: ({ node, ...props }) => <Table striped {...props} />,
          code: ({ node, ...props }) => (
            <Card>
              <Card.Body {...props}></Card.Body>
            </Card>
          ),
        }}
      />
    </Container>
  );
};

export default MarkdownPage;
