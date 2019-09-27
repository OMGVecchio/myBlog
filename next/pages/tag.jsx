import { PureComponent, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Tag } from 'antd'

import { filterArticleList } from '_'

import Layout from '~/layout'
import TagCard from '~/card/tag'

const allTagName = '全部'

@inject('articleStore')
@observer
class ArticleByTagPage extends PureComponent {
  static defaultProps = {
    articleStore: {}
  }
  static getInitialProps = async ({ ctx }) => {
    const { query, store } = ctx
    const { kw } = query
    await store.articleStore.fetchArticleList()
    await store.tagStore.fetchTagList()
    return { kw }
  }
  constructor(props) {
    super(props)
    this.state = { filterTag: allTagName }
    this.allTags = []
  }
  showCardList = (cardData = []) => {
    const cardList = []
    const cardMap = {
      default: []
    }
    const allTags = []
    cardData.forEach((item) => {
      const { tags = [] } = item
      if (tags.length > 0) {
        tags.forEach((tag) => {
          if (!cardMap[tag]) {
            cardMap[tag] = [item]
            allTags.push(tag)
          } else {
            cardMap[tag].push(item)
          }
        })
      } else {
        cardMap.default.push(item)
      }
    })
    this.allTags = allTags
    const { filterTag } = this.state
    Object.keys(cardMap).forEach((tag) => {
      if (filterTag !== allTagName && filterTag !== tag) {
        return
      }
      if (cardMap[tag].length === 0) {
        return
      }
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
  filterTag = tag => this.setState({ filterTag: tag })
  renderExtraHead = () => {
    const allTags = [allTagName].concat(this.allTags)
    return (
      <div>
        {
          allTags.map(tag => <Tag onClick={() => this.filterTag(tag)} key={tag}>{tag}</Tag>)
        }
      </div>
    )
  }
  render() {
    const { kw, articleStore } = this.props
    let { articleList = [] } = articleStore
    articleList = filterArticleList(articleList, kw)
    const cardList = this.showCardList(articleList)
    return (
      <Layout
        title="老司机带你熟练翻车的标签页"
        extraHead={this.renderExtraHead()}
      >
        <Fragment>
          {cardList}
        </Fragment>
      </Layout>
    )
  }
}

export default ArticleByTagPage
