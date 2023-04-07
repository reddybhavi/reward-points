import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import RewardsHome from './components/RewardsHome'

function App() {
  return (
    <div className="App rewards-center-app">
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <RewardsHome />
      </ThemeProvider>
    </div>
  );
}

export default App;
