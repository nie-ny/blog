// 缩放比
export function scale() {
  let designWidth = 1920
  let designHeight = 1080
  let scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight
  return scale
}
