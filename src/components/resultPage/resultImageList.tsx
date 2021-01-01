import { Button, createStyles, makeStyles } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from '../../firebase'
import { TitleData } from "../../types/types";

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      textAlign: 'center',
      marginTop: '2%'
    },
    titleImage: {
      height: '218px',
      width: '218px'
    },
  })
)

const ImageItemList: FC = () => {
  const [data, setData] = useState<TitleData[]>([])
  const { keyword }: any = useParams()
  const classes = useStyle()
  const history = useHistory()

  const getData = async (searchWord: string | undefined) => {
    const db = firebase.firestore()
    const titleDataRef = db.collection('titleData')
    const searchedData = titleDataRef.where('keyword', 'array-contains', searchWord)
    const snapShot = await searchedData.get()
    const temporaryData: object[] = []

    snapShot.docs.map(doc => (
      temporaryData.push(doc.data())
    ))

    setData(temporaryData as TitleData[])
  }

  useEffect(() => {
    getData(keyword)
  }, [])

  return (
    <div className={classes.root}>
      {data.map((title) => (
        <div>
          <Button onClick={() => history.push("/download/" + title.title)}>
          <img
            src={title.image}
            alt={title.title}
            className={classes.titleImage}
            />
          </Button>
          <h3>{ title.title }</h3>
        </div>
      ))}
    </div>
  )
}

export default ImageItemList