/**
 * fullScreen compatible
 */

export const openFull = () => {
  /**
   * bind at one dom
   *  such as: img.requestFullScreen
   */
  const el = document.documentElement
  const rfs = el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullScreen
  rfs.call(el)
}

export const closeFull = () => {
  /**
   * bind at the document
   *  such as: document.exitFullscreen
   */
  const d = document
  const cfs = d.exitFullscreen
    || d.webkitCancelFullScreen
    || d.mozCancelFullScreen
    || d.msExitFullscreen
  cfs.call(d)
}

export default {
  openFull,
  closeFull
}
