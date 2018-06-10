import { Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import types from 'store/action/common'

const Aside = ({
  dispatch,
  asideIsOpen
}) => {
  const close = () => {
    dispatch({ type: types.CLOSE_ASIDE })
  }
  return (
    <Fragment>
      <div className={classNames('aside-menu', { close: !asideIsOpen })}>
        <div>
          我就是菜单
        </div>
        <div className="close-btn" role="button" tabIndex={0} onClick={() => close(dispatch)}>
          X
        </div>
      </div>
      <style jsx>{`
        @width: 240px;
        @duration: 0.5s;
        .aside-menu {
          position: fixed;
          z-index: 100;
          box-sizing: border-box;
          width: @width;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: #fff;
          transition: left @duration;
          .close-btn {
            display: block;
            width: 20px;
            height: 20px;
            border-raidus: 50%;
            color: #fff;
            background-color: green;
            position: absolute;
            right: -60px;
          }
          &.close {
            left: -@width;
            .close-btn {
              display: none;
            }
          }
        }
      `}
      </style>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  return {
    asideIsOpen
  }
}

export default connect(mapStateToProps)(Aside)
