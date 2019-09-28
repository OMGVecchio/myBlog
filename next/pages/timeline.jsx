import { PureComponent, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Anchor, Row, Col } from 'antd'

import Layout from '~/layout'
import TimelineCard from '~/card/timeline'

import { filterArticleList } from '_'
import Moment from '_/moment'

import '@/styles/pages/timeline.less'

const { Link } = Anchor

@inject('articleStore')
@observer
class TimelinePage extends PureComponent {
  static defaultProps = {
    articleStore: {}
  }
  static getInitialProps = async ({ ctx }) => {
    const { query, store } = ctx
    const { kw } = query
    await store.articleStore.fetchArticleList()
    return { kw }
  }
  setCardList = (cardDataList = []) => {
    let cardDataCache = null
    const signTag = {
      year: '',
      month: ''
    }
    const cardList = []
    const total = cardDataList.length

    const cardDataMap = {}
    cardDataList.forEach((item) => {
      const { createTime } = item
      // TODO：不删减时间戳的排序，修改过后的文章会排在最前面
      cardDataMap[createTime.toString().slice(0, 10)] = item
    })
    const cardData = Object.keys(cardDataMap).map(timestamp => cardDataMap[timestamp]).reverse()

    // TODO：以下的排序，修改过后的文章会排在最前面
    // const cardData = cardDataList
    // cardData.sort((prev, next) => {
    //   const { createTime: prevTime } = prev
    //   const { createTime: nextTime } = next
    //   return prevTime < nextTime
    // })
    cardData.forEach((item, index) => {
      // 因为按照日期去取的，所以才这样子区分也行吧
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
        // const anchorTag = `${signTag.year}-${signTag.month}`
        if (!this.anchorMap[signTag.year]) {
          this.anchorMap[signTag.year] = [signTag.month]
        } else if (this.anchorMap[signTag.year].indexOf(signTag.month) === -1) {
          this.anchorMap[signTag.year].push(signTag.month)
        }
        // 如果之前有缓存的单个数据，优先输出
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
          <h2 className="card-list-delimiter" id={`${signTag.year}-${signTag.month}`} key={`${signTag.year}-${signTag.month}`}>
            {signTag.year}年{signTag.month}月
          </h2>
        ))
        if (total === index + 1) {
          // 如果是最后一个，直接输出
          cardList.push((
            <Row gutter={20} key={item.id}>
              <Col span={12}>
                <TimelineCard {...item} />
              </Col>
            </Row>
          ))
        } else {
          // 若不是最后一个，缓存起来
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
        } else {
          cardDataCache = item
        }
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
    const anchorList = Object.keys(anchorMap).reverse().map((anchorYear) => {
      const anchorMonthes = anchorMap[anchorYear]
      const anchorSubList = anchorMonthes.map((month) => {
        const hrefTag = `${anchorYear}-${month}`
        return (
          <Link key={hrefTag} href={`#${hrefTag}`} title={hrefTag} />
        )
      })
      return (
        <Link key={anchorYear} href={`#${anchorYear}`} title={anchorYear}>
          { anchorSubList }
        </Link>
      )
    })
    return (
      <Anchor className="anchor-style-fix">
        {anchorList}
      </Anchor>
    )
  }
  anchorMap = {}
  render() {
    const { kw, articleStore } = this.props
    let { articleList = [] } = articleStore
    articleList = filterArticleList(articleList, kw)
    const getCardList = this.setCardList(articleList)
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

export default TimelinePage
