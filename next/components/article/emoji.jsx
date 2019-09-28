import { Fragment } from 'react'

import Emoji from '_/emoji'

import '@/styles/components/article/emoji.less'

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
