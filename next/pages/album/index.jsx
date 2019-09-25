import { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal } from 'antd'

import Layout from '~/layout'

const { Meta } = Card

const Album = () => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const openModal = () => setModalVisibility(true)
  const closeModal = () => setModalVisibility(false)
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
          onOk={closeModal}
          onCancel={closeModal}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </Layout>
  )
}

export default connect()(Album)
