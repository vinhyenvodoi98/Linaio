import { lazy, Suspense } from 'react';
import { Body } from './components';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import history from './routerHistory';
import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';
import NavBar from 'components/NavBar';
import { Loading } from 'components/Loading';

const Home = lazy(() => import('view/Home'));
const Stall = lazy(() => import('view/Stall'));
const Auction = lazy(() => import('view/Auction'));
const QA = lazy(() => import('view/QA'));
const Create = lazy(() => import('view/Create'));

function App() {
  const { mountedComponent } = useContext(ThemeContext);

  if (!mountedComponent) return <div />;

  return (
    <BrowserRouter>
      <Router history={history}>
        <NavBar />

        <Body>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/QA" component={QA} />
              <Route exact path="/stall" component={Stall} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/auction/:auctionAddress" component={Auction} />
              {/* <Route path='*' component={NotFound} /> */}
            </Switch>
          </Suspense>
        </Body>
      </Router>
    </BrowserRouter>
  );
}

export default App;
