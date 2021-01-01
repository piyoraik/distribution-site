import React, { FC } from 'react'
import TopHeader from '../components/topPage/topHeader'
import TopMain from '../components/topPage/topMain'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import ResultPage from './resultPage'
import DownloadPage from './downloadPage'

const TopPage: FC = () => {
  return (
    <div>
      <TopHeader />
      <Router>
        <Switch>
          <Route exact path="/">
            <TopMain />
          </Route>
          <Route exact path="/search/:keyword">
            <ResultPage />
          </Route>
          <Route exact path="/download/:keyword">
            <DownloadPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default TopPage