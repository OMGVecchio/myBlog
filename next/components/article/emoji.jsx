import Emoji from '_/emoji'

import style from '@/styles/components/article/emoji'

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
        className={style['emoji-item']}
        role="button"
        tabIndex={index}
        onClick={() => onSelect(emojiCode)}
      >
        {emojiCode}
      </span>
    )
  })
  return (
    <div className={style['component-emoji']}>
      {visible && (
        <div className={style['emoji-wrap']}>
          {composeEmojiList()}
        </div>
      )}
    </div>
  )
}

export default EmojiWrap
