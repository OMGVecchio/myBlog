import { Upload } from 'antd'

import { getToken } from '_/token'

const UploaderWrap = (props = {}) => {
  const { headers = {} } = props
  headers['access-token'] = getToken()
  const newProps = Object.assign({}, props, { headers })
  return <Upload {...newProps} />
}

export default UploaderWrap
