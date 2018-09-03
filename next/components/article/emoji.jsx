import { Fragment } from 'react'
import Head from 'next/head'

import Emoji from 'utils/emoji'

import style from 'static/styles/components/article/emoji.less'

const { list, map } = Emoji

const EmojiWrap = ({
  visible = true,
  onSelect = () => {}
}) => {
  const composeEmojiList = () => list.map((emoji, index) => {
    const emojiCode = map[emoji]
    return (
      <span
        key={emoji}
        title={emoji}
        className="emoji-item"
        role="button"
        tabIndex={index}
        onClick={() => onSelect(emojiCode)}
      >
        {emojiCode}
      </span>
    )
  })
  return (
    <Fragment>
      <div className="component-emoji">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
        {visible && (
          <div className="emoji-wrap">
            {composeEmojiList()}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default EmojiWrap
