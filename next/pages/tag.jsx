import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchList } from 'store/action/article'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import TagCard from 'components/card/tag'

class Tag extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps = async ({ ctx }) => {
    const { store } = ctx
    await store.dispatch(fetchList())
  }
  showCardList = (cardData = []) => {
    const cardList = []
    const cardMap = {
      default: []
    }
    cardData.forEach((item) => {
      const { tags = [] } = item
      if (tags.length > 0) {
        tags.forEach((tag) => {
          if (!cardMap[tag]) {
            cardMap[tag] = [item]
          } else {
            cardMap[tag].push(item)
          }
        })
      } else {
        cardMap.default.push(item)
      }
    })
    Object.keys(cardMap).forEach((tag) => {
      cardList.push((
        <h2 className="card-list-delimiter" id={tag} key={`${tag}-title`}>
          {tag}
        </h2>
      ))
      let cardDataCache = null
      cardMap[tag].forEach((item, index) => {
        const total = cardMap[tag].length
        if (!cardDataCache) {
          if (total === index + 1) {
            cardList.push((
              <Row gutter={20} key={`${tag}-${item.id}`}>
                <Col span={12}>
                  <TagCard {...item} />
                </Col>
              </Row>
            ))
          } else {
            cardDataCache = item
          }
        } else {
          cardList.push((
            <Row gutter={20} key={`${tag}-${cardDataCache.id}`}>
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
