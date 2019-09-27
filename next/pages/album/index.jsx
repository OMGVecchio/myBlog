import { useState } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Button,
  Card,
  Modal,
  Input
} from 'antd'

import Layout from '~/layout'
import xhr from '_/fetch'

const { Meta } = Card

const Album = ({ albumStore }) => {
  console.log(albumStore)
  const [modalVisibility, setModalVisibility] = useState(false)
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumDesc, setAlbumDesc] = useState('')
  const openModal = () => setModalVisibility(true)
  const closeModal = () => setModalVisibility(false)
  const setAlbumTitleVal = e => setAlbumTitle(e.target.value)
  const setAlbumDescVal = e => setAlbumDesc(e.target.value)
  const createAlbum = async () => {
    const result = await xhr.post('/api/auth/album/category/create', {
      title: albumTitle,
      desc: albumDesc
    })
    console.log(result)
  }
  const extraHead = (
    <Button onClick={openModal}>
      新建相册
    </Button>
  )
  return (
    <Layout title="相册" extraHead={extraHead}>
      <div>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Modal
          title="新建相册"
          visible={modalVisibility}
          onOk={createAlbum}
          onCancel={closeModal}
        >
          <p>
            <Input
              placeholder="相册名"
              value={albumTitle}
              onChange={setAlbumTitleVal}
            />
          </p>
          <p>
            <Input.TextArea
              placeholder="相册描述"
              value={albumDesc}
              onChange={setAlbumDescVal}
            />
          </p>
        </Modal>
      </div>
    </Layout>
  )
}

export default inject('albumStore')(observer(Album))
