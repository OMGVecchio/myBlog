const cardLayout = Card => ({
  id,
  title,
  createTime,
  cover,
  desc
}) => {
  const titleDefault = title || '暂无标题'
  const coverDefault = cover || '//files.vladstudio.com/joy/cats/wall/vladstudio_cats_800x600_signed.jpg'
  const descDefault = desc || '暂无描述'
  const props = {
    id,
    title: titleDefault,
    createTime,
    cover: coverDefault,
    desc: descDefault
  }
  return <Card {...props} />
}

export default cardLayout
