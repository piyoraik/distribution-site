import { createStyles, makeStyles } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TitleData } from "../types/types";
import firebase from "../firebase"

const UseStyles = makeStyles(() =>
  createStyles({
    titleImage: {
      height: '436px',
      width: '436px'
    }
  })
)

const DownloadPage: FC = () => {
  const { keyword }: any = useParams()
  const classes = UseStyles()
  const [data, setData] = useState<TitleData[]>([])

  const getData = async (searchWord: string | undefined) => {
    const db = firebase.firestore()
    const titleDataRef = db.collection('titleData')
    const searchedData = titleDataRef.where('keyword', "array-contains", searchWord)
    const temporaryData: object[] = []
    const snapShot = await searchedData.get()

    snapShot.docs.map(doc => (
      temporaryData.push(doc.data())
    ))

    setData(temporaryData as TitleData[])
  }

  const displayImage = () => {
    return (
      <div>
        {data.map((title) => (
          <div>
            <img
              src={title.image}
              alt={title.title}
              className={classes.titleImage}
            />
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    getData(keyword)
  },[])

  return (
    <div>
      {displayImage()}
    </div>
  )
}

export default DownloadPage