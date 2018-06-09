import { connect } from 'react-redux'
import types from 'store/action/common'

const close = (dispatch) => {
  dispatch({ type: types.CLOSE_ASIDE })
}

const Aside = ({
  dispatch,
  asideIsOpen
}) => (
  <div className="aside-menu">
    <div>
      我就是菜单
    </div>
    {
      asideIsOpen
        ? (
          <div className="close" role="button" tabIndex={0} onClick={() => close(dispatch)}>
            X
          </div>
        )
        : ''
    }
    <style jsx>{`
      .aside-menu {
        position: fixed;
        z-index: 100;
        box-sizing: border-box;
        width: 240px;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #fff;
        .close {
          width: 20px;
          height: 20px;
          border-raidus: 50%;
          color: #fff;
          background-color: green;
          position: absolute;
          right: -60px;
        }
      }
    `}
    </style>
  </div>
)

const mapStateToProps = ({ common = {} }) => {
  const { asideIsOpen = {} } = common
  return {
    asideIsOpen
  }
}

export default connect(mapStateToProps)(Aside)
