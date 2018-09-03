const actionTypes = {
  OPEN_ASIDE: 'common/open_aside',
  CLOSE_ASIDE: 'common/close_aside',
  SHOW_HEADER_SHADOW: 'common/show_header_shadow',
  HIDE_HEADER_SHADOW: 'common/hide_header_shadow'
}

export default actionTypes

export const openAside = () => ({
  type: actionTypes.OPEN_ASIDE
})

export const closeAside = () => ({
  type: actionTypes.CLOSE_ASIDE
})

export const showHeaderShadow = () => ({
  type: actionTypes.SHOW_HEADER_SHADOW
})

export const hideHeaderShadow = () => ({
  type: actionTypes.HIDE_HEADER_SHADOW
})
