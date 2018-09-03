import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import Head from 'next/head'

import { fetchList } from 'store/action/article'

import { Anchor, Row, Col } from 'antd'

import Layout from 'components/layout'
import TimelineCard from 'components/card/timeline'

import Moment from 'utils/moment'

import style from 'static/styles/pages/timeline.less'

const { Link } = Anchor
class Timeline extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps = async ({ ctx }) => {
    const { query, store } = ctx
    const { kw } = query
    await store.dispatch(fetchList())
    return { kw }
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
        // const anchorTag = `${signTag.year}-${signTag.month}`
        if (!this.anchorMap[signTag.year]) {
          this.anchorMap[signTag.year] = [signTag.month]
        } else if (this.anchorMap[signTag.year].indexOf(signTag.month) === -1) {
          this.anchorMap[signTag.year].push(signTag.month)
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
          <h2 className="card-list-delimiter" id={`${signTag.year}-${signTag.month}`} key={`${signTag.year}-${signTag.month}`}>
            {signTag.year}年{signTag.month}月
          </h2>
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
    const anchorList = Object.keys(anchorMap).map((anchorYear) => {
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
    const { kw } = this.props
    let { articleList = [] } = this.props
    if (kw) {
      articleList = articleList.filter((articel) => {
        const { title } = articel
        if (title.indexOf(kw) !== -1) {
          return true
        }
        return false
      })
    }
    const getCardList = this.setCardList(articleList)
    return (
      <Layout title="文章时间轴">
        <Fragment>
          <Head>
            <style dangerouslySetInnerHTML={{ __html: style }} />
          </Head>
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
