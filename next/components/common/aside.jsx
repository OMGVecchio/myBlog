const hehe = (e) => {
  console.log(e);
}

export default () => (
  <div className="aside-menu">
    <div>
      我就是菜单
    </div>
    <div className="close" role="button" tabIndex={0} onClick={hehe}>
      X
    </div>
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
