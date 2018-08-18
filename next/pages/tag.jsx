import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchList } from 'store/action/article'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import TagCard from 'components/card/tag'

import Moment from 'utils/moment'

class Tag extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps = async ({ ctx }) => {
    const { store } = ctx
    await store.dispatch(fetchList())
  }
  showCardList = (cardData = []) => {
    let cardDataCache = null
    const signTag = { year: '', month: '' }
    const cardList = []
    const total = cardData.length
    cardData.forEach((item, index) => {
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
        if (cardDataCache) {
          cardList.push((
            <Row gutter={20} key={cardDataCache.id}>
              <Col span={12}>
                <TagCard {...cardDataCache} />
              </Col>
            </Row>
          ))
        }
        cardList.push((
          <h3 id={`${signTag.year}-${signTag.month}`}>
            {signTag.year}年{signTag.month}月
          </h3>
        ))
        if (total === index + 1) {
          cardList.push((
            <Row gutter={20} key={item.id}>
              <Col span={12}>
                <TagCard {...item} />
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
                <TagCard {...item} />
              </Col>
            </Row>
          ))
        }
        cardDataCache = item
      } else {
        cardList.push((
          <Row gutter={20} key={cardDataCache.id}>
            <Col span={12}>
              <TagCard {...cardDataCache} />
            </Col>
            <Col span={12}>
              <TagCard {...item} />
            </Col>
          </Row>
        ))
        cardDataCache = null
      }
    })
    return cardList
  }
  render() {
    return (
      <Layout title="老司机带你熟练翻车的标签页">
        <Fragment>
          {this.showCardList(this.props.articleList)}
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

export default connect(mapStateToProps)(Tag)
