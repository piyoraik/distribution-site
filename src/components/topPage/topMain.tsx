import React, { FC, useState } from 'react';
import pencil from '../../assets/images/pencil.jpg';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import {useHistory} from 'react-router-dom'

const useStyle = makeStyles(() =>
  createStyles({

    background: {
      backgroundImage: `url(${pencil})`,
      backgroundSize: 'cover',
      height: '100vh',
    },

    paper: {
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      top: '33%',
      width: '45%',
    },
  })
)

const TopMain: FC = () => {
  const classes = useStyle()
  const [keyword, setKeyword] = useState("")
  const history = useHistory()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const handleSubmit = () => {
    history.push('/search/' + keyword)
  }

  return (
    <div className={classes.background}>
      <Paper className={classes.paper} onSubmit={handleSubmit} component="form">
        <IconButton type="submit">
          <Search />
        </IconButton>
        <InputBase
          placeholder="無料素材を検索"
          onChange={handleChange}
        />
      </Paper>
    </div>
  )
}

export default TopMain