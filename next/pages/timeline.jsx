import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchList } from 'store/action/article'

import { Anchor, Row, Col } from 'antd'

import Layout from 'components/layout'
import TimelineCard from 'components/card/timeline'

import Moment from 'utils/moment'

const { Link } = Anchor
class Timeline extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps = async ({ ctx }) => {
    const { store } = ctx
    await store.dispatch(fetchList())
  }
  setCardList = (cardData = []) => {
    let cardDataCache = null
    const signTag = { year: '', month: '' }
    const cardList = []
    const total = cardData.length
    cardData.forEach((item, index) => {
      // 因为按照日期去取的，所以才这样子去分也行吧
      let hasSameSign = true
      const { createTime } = item
      const date = new Moment(createTime)
      const year = date.getYear()
      const month = date.getMonth()
      if (signTag.month !== month) {
        signTag.month = month
        hasSameSign = false
      }
      if (signTag.year !== year) {
        signTag.year = year
        hasSameSign = false
      }
      if (!hasSameSign) {
        // 获取 anchor 数据
        const anchorTag = `${signTag.year}-${signTag.month}`
        if (!this.anchorMap[anchorTag]) {
          this.anchorMap[anchorTag] = true
        }
        if (cardDataCache) {
          cardList.push((
            <Row gutter={20} key={cardDataCache.id}>
              <Col span={12}>
                <TimelineCard {...cardDataCache} />
              </Col>
            </Row>
          ))
        }
        cardList.push((
          <h3 id={`${signTag.year}-${signTag.month}`} key={`${signTag.year}-${signTag.month}`}>
            {signTag.year}年{signTag.month}月
          </h3>
        ))
        if (total === index + 1) {
          cardList.push((
            <Row gutter={20} key={item.id}>
              <Col span={12}>
                <TimelineCard {...item} />
              </Col>
            </Row>
          ))
        } else {
          cardDataCache = item
        }
      } else if (!cardDataCache) {
        if (total === index + 1) {
          cardList.push((
            <Row gutter={20} key={item.id}>
              <Col span={12}>
                <TimelineCard {...item} />
              </Col>
            </Row>
          ))
        }
        cardDataCache = item
      } else {
        cardList.push((
          <Row gutter={20} key={cardDataCache.id}>
            <Col span={12}>
              <TimelineCard {...cardDataCache} />
            </Col>
            <Col span={12}>
              <TimelineCard {...item} />
            </Col>
          </Row>
        ))
        cardDataCache = null
      }
    })
    return cardList
  }
  setAnchor = (anchorMap) => {
    const anchorList = Object.keys(anchorMap).map(anchorTag => <Link key={anchorTag} href={`#${anchorTag}`} title={anchorTag} />)
    return (
      <Anchor
        getContainer={() => document.querySelector('.global-wrap')}
        className="anchor-style-fix"
        style={{
          position: 'fixed',
          top: '300px',
          right: '10px'
        }}
      >
        {anchorList}
      </Anchor>
    )
  }
  anchorMap = {}
  render() {
    const getCardList = this.setCardList(this.props.articleList)
    return (
      <Layout title="文章时间轴">
        <Fragment>
          {this.setAnchor(this.anchorMap)}
          {getCardList}
        </Fragment>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const article = state.get('article')
  let articleList = article.get('articleList')
  if (articleList.toJS) {
    articleList = articleList.toJS()
  }
  return { articleList }
}

export default connect(mapStateToProps)(Timeline)
