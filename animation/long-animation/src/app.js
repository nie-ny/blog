import * as PIXI from "pixi.js";
import AlloyTouch from 'alloytouch'
import { TweenMax, TimelineMax } from 'gsap'

class Index {
  constructor(options) {
    // 事件监听
    this.callbacks = {
      loadProgress: [],
    };

    this.sprites = []; // 精灵初始纹理对象
    this.texts = []; // pixi 中 文本对象
    this.aniIntervals = [];// 无线循环动画的 清除id

    this.width = options.width || window.innerWidth; // 场景宽
    this.height = options.height || window.innerHeight; // 场景高
    this.container = options.container || document.body; // 场景容器

    // 创建场景
    this.app = new PIXI.Application({
      resolution: 2, // 渲染器的分辨率/设备像素比率  设置为2 肉眼看就不会是模糊的
      transparent: true, // 取消背景颜色
      width: this.width, // 创建后的画布宽
      height: this.height, // 创建后的画布高
    });
    // 加入容器
    this.container.appendChild(this.app.view);

    // 加入精灵
    this.load();
  }

  /**
   * 图片资源 组装
   */
  resources = () => {
    let sprites = [];
    // 女孩资源
    for (let i = 0; i < 62; i += 1) {
      sprites.push({
        name: `girl${i}`,
        url: `/static/imgs/girl/${160 + i}.png`,
      });
    }
    // 背景资源
    for (let i = 0; i < 50; i += 1) {
      sprites.push({
        name: `ani${i}`,
        url: `/static/imgs/ani/${701 + i}.png`,
      });
    }
    // 漂浮物品资源
    for (let i = 1; i < 8; i += 1) {
      sprites.push({
        name: `item${i}`,
        url: `/static/imgs/items/${i}.png`,
      });
    }
    // 飞机资源
    for (let i = 0; i < 25; i += 1) {
      sprites.push({
        name: `plane${i}`,
        url: `/static/imgs/plane/${408 + i}.png`,
      });
    }

    return sprites;
  };

  // 添加资源进入 应用
  load = () => {
    const sprites = this.resources(); // 图片资源
    const loader = new PIXI.Loader();
    // 图片加载进度
    // loader.onProgress.add((row) => {
    //   console.log("进度", row.progress);
    // });
    loader.add(sprites).load(this.loadDone);
  };

  // 精灵加载后执行
  loadDone = () => {
    this.initBg();
    this.initTexts();

    this.initSprites();// 加载精灵

    this.initTimeline();
    this.initTouch();
  };

  /**
   * 背景
   */
  initBg = () => {
    // 绘制背景
    this.bg = new PIXI.Graphics()
    this.bg.beginFill(0xfdfbe2)
    this.bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height)
    this.bg.endFill()
    this.bg.x = 0
    this.bg.y = 0
    this.app.stage.addChild(this.bg)
  }

  /**
   * 创建 文本
   */
  initTexts = () => {
    // 一次可创建建多个
    const texts = {
      guide: {
        text: '向上滑动，开始动画',
        position: 'center',
        anchor: 'center',
        options: { // 文字样式
          fontFamily: 'Arial',
          fontSize: window.innerWidth / 375 * 18,
          fill: 0xfb833f,
          align: 'center'
        }
      }
    }
    Object.keys(texts).forEach((key) => {
      // 创建
      const options = texts[key]
      const text = new PIXI.Text(options.text, options.options)
      // 锚点位置
      this.setAnchor(text, options.anchor)
      // 页面位置
      this.setPosition(text, options.position)
      // 设置点击事件
      if (options.link) {
        text.interactive = true
        text.on('tap', () => {
          location.href = options.link
        })
      }
      // 加入场景
      this.app.stage.addChild(text)
      // 保存  pixi 上的对象 后面动画时操作
      this.texts[key] = text
    })
  }

  /**
   * 加载精灵
   */
  initSprites = () =>{
    const sprites = this.getSprites();
    Object.keys(sprites).forEach((key)=>{
      const obj = sprites[key];
      const sprite = new PIXI.Sprite(PIXI.utils.TextureCache[obj.key]);
      // 设置属性
      this.setSize(sprite, obj.size)
      this.setAnchor(sprite, obj.anchor)
      this.setPosition(sprite, obj.position)
      // 加入场景
      this.app.stage.addChild(sprite);
      // 缓存纹理对象
      this.sprites[key] = sprite
    })
  }

  /**
   * 初始化精灵 数据组装
   */
  getSprites () { 
    const sprites = {
      ani: {
        key: 'ani0',
        size: { mode: 'widthFit', width: 1 },
        position: 'center',
        anchor: 'center'
      },
      girl: {
        key: 'girl0',
        size: { mode: 'widthFit', width: 1 },
        position: 'center',
        anchor: 'center'
      },
      plane: {
        key: 'plane0',
        size: { mode: 'widthFit', width: 0.5 },
        position: {
          x: 0.5, y: 0.4
        },
        anchor: 'center'
      }
    }
    for (let i = 1; i < 8; i += 1) {
      const x = i % 2 === 0 ? 1.1 : -0.1
      sprites[`item${i}`] = {
        key: `item${i}`,
        size: { mode: 'widthFit', width: 0.8 },
        position: { x, y: 1.4 },
        anchor: 'center'
      }
    }
    return sprites
  }

  /**
   * 添加动画
   */
  initTimeline () {
    this.timeline = new TimelineMax({
      paused: true
    })

    const spritesAnimations = this.getSpritesAnimations();
    // 设置精灵动画
    Object.keys(spritesAnimations).forEach((key) => {
      this.setAnimation(this.sprites[key], spritesAnimations[key])
    })

    // 设置文本动画
    const textsAnimations = {
      guide: [{
        delay: 0,
        duration: 1,
        type:"timelineMax",
        tweenMax:{
          from: { y: window.innerHeight * 0.5 },
          to: { yoyo: true, repeat: -1, ease: 'easeOut', y: window.innerHeight * 0.48 }
        }
      }, {
        delay: 0,
        duration: 0.1,
        type:"timelineMax",
        tweenMax:{
          to: { alpha: 0 }
        }
      }],
    }
    Object.keys(textsAnimations).forEach((key) => {
      this.setAnimation(this.texts[key], textsAnimations[key])
    })
  }

  /**
   * 精灵动画组装
   */
  getSpritesAnimations = () => {
    const animations = {
      // 女孩
      girl: [{
        delay: 0,
        duration: 1,
        type:"frame",
        frames: this.getFrames('girl', 62)
      }, {
        delay: 0,
        duration: 0.2,
        type:"timelineMax",
        tweenMax:{
          from: { y: -window.innerHeight },
          to: { y: window.innerHeight * 0.5 }
        }
      }, {
        delay: 0.7,
        duration: 0.3,
        type:"timelineMax",
        tweenMax:{
          to: { y: window.innerHeight * 1.2 }
        }
      }],

      // 旋涡
      ani: [{
        delay: 0,
        duration: 0.6,
        type:"timelineMax",
        tweenMax:{
          from: { alpha: 0 },
          to: { alpha: 1 }
        }
      }, {
        delay: 0.1,
        duration: 0.6,
        type:"frame",
        frames: this.getFrames('ani', 50)
      }, {
        delay: 0.7,
        duration: 0.2,
        type:"timelineMax",
        tweenMax:{
          to: { alpha: 0 }
        }
      }, {
        delay: 0.7,
        duration: 0.2,
        type:"frame",
        frames: this.getFrames('ani', 50).reverse()
      }],
      
      // 飞机
      plane: [{
        frames: this.getFrames('plane', 25),
        frameRate: 10,
        type: "infinite",
      }, {
        delay: 0.8,
        duration: 0.2,
        type:"timelineMax",
        tweenMax:{
          from: { width: 0, height: 0, alpha: 0 }
        }
      }]
    }
    // 物品
    for (let i = 1; i < 8; i += 1) {
      // 动画开始时间  
      const delay = 0.21 + (i / 7 * 0.2)
      // 左右分布 
      const x = i % 2 === 0 ? window.innerWidth * 0.65 : window.innerWidth * 0.35
      // 每一个物品都有两个动画
      animations[`item${i}`] = [{
        delay,
        duration: 0.2,
        type:"timelineMax",
        tweenMax:{
          to: { x, y: -window.innerHeight * 0.2, width: 0, height: 0 }
        }
      }, {
        duration: 0.5 + Math.random(),
        type:"timelineMax",
        tweenMax:{
          to: { yoyo: true, repeat: -1, rotation: 0.1 }
        }
      }]
    }
    return animations
  }

  // 动画帧
  getFrames = (key, n, start = 0) => {
    const frames = []
    for (let i = start; i < n + start; i += 1) {
      frames.push(`${key}${i}`)
    }
    return frames
  }


  // 测试 ────────────────────────────────────────────────────────────────────────────────
  /**
   * 资源开始加载动画
   */
  tesTspirit = () => {
    // 创建 纹理对象
    const sprite = new PIXI.Sprite(PIXI.utils.TextureCache['girl0']);
    // console.log("🚀 ~ file: app.js ~ line 91 ~ Index ~ sprite", sprite,PIXI.utils.TextureCache['girl2']);

    // 设置大小
    this.setSize(sprite, { mode: 'widthFit', width: 1 })
    // 设置锚点位置
    this.setAnchor(sprite, "center")
    // 设置画布位置
    this.setPosition(sprite, "center")

    // 资源加入舞台
    this.app.stage.addChild(sprite);
    
    // 动画帧
    // 组装同类资源名称
    const frames = []
    for (let i = 0; i < 62; i += 1) {
      frames.push(`girl${i}`)
    }
    // 动画
    const animation = [
      {
        frames,
        frameRate: 10,
        delay: 0,
        duration: 1,
        type:"infinite",
      },
      {
        frameRate: 10,
        delay: 0,
        duration: 0.2,
        tweenMax:{
          from:{ y: -window.innerHeight},
          to:{ y: window.innerHeight * 0.5 }
        },
        type:"timelineMax",
      }
    ]

    // 开始设置时间动画
    this.timeline = new TimelineMax({
      paused: true
    })
    // 开始 过度动画
    // this.timeline.play()

    this.setAnimation(sprite,animation)
  };

  // 滑动相关 ────────────────────────────────────────────────────────────────────────────────

  /**
   * 初始化 滚动事件
   */
  initTouch = () => {
    this.alloyTouch = new AlloyTouch({
      touch: '.home', // 反馈触摸的dom
      initialValue: 0, // 起始位置
      sensitivity: 0.5, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
      maxSpeed: 0.5, // 不必需，触摸反馈的最大速度限制
      min: -this.height, // 滚动最小为 总高度 --向上滚动 计算是减
      max: 0,// 最大值 向下滚动值 最大也是 0
      value:0,
      change: this.touchmove
    })
  }

  /**
   * 滑动事件回调
   * @param {*} value 滑动距离
   */
  touchmove = (value) => {
    // 总播放进度 --通过当前滚动距离 计算总高度 在1秒内 的时间
    this.progress = -value / this.height
    this.progress = this.progress < 0 ? 0 : this.progress
    this.progress = this.progress > 1 ? 1 : this.progress
    // 时间轴动画 控制进度 --总时间1秒 
    this.timeline.seek(this.progress)
    // 触发事件 --触发在帧动画中保存的事件 传入计算后 高度 对应的时间
    this.trigger('progress', this.progress)
  }

  // 动画相关 ────────────────────────────────────────────────────────────────────────────────
  /**
   * 动画设置
   * @param {*} obj 精灵对象
   * @param {*} animations 动画配置对象
   */
  setAnimation (obj, animations) {
    // console.log("🚀 ~ file: app.js ~ line 343 ~ Index ~ setAnimation ~ obj", obj)
    if (obj && animations && animations instanceof Array) {
      // frames 精灵的名称 总和
      // frameRate 动画循环速度 --数越大 动画越快
      // delay 动画延迟时间
      // duration 动画持续时间
      // tweenMax 框架参数
      // type 类型
      animations.forEach(({frames , frameRate = 1, delay = 0, duration = 1, tweenMax, type }) => {
        
        if(type === "frame"){
          // 自定义 事件动画 --修改资源
          this.onFrame(obj, duration, delay, frames)
        }else if(type === "infinite"){
          // 无限 循环动画 --修改资源
          this.onInfinite(obj, frameRate, frames)
        }else if(type === "timelineMax"){
          // 时间轴动画 包括无限动画 --修改纹理对象属性
          this.onTimeline(obj, duration, delay, tweenMax.from, tweenMax.to)
        }
      })
    }
  }

  /**
   * 帧动画
   * 自定义 事件 根据对应的时间 修改纹理对象 展示的图片
   * @param {*} obj 要改变的对象
   * @param {*} duration 动画持续时间
   * @param {*} delay 动画延迟时间
   * @param {*} frames 精灵的名称 总和
   */
  onFrame (obj, duration, delay, frames) {
    // 在本地缓存中 保存自定义事件 在滑动事件是触发
    // progress 滑动事件 计算后 滚动位置 对应的 动画时间
    this.on('progress', (progress) => {
      const frameProgress = (progress - delay) / duration
      let index = Math.floor(frameProgress * frames.length)
      if (index < frames.length && index >= 0) {
        const frame = frames[index]
        obj._texture = PIXI.utils.TextureCache[frame]
      }
    })
  }

  /**
   * 无限循环动画
   * @param {*} obj 要改变的对象
   * @param {*} frameRate 动画循环速度 --数越大 动画越快
   * @param {*} frames 精灵的名称 总和 --同类型的资源名称
   */
  onInfinite (obj, frameRate, frames) {
    obj.frames = frames
    obj.currentFrame = 0
    // 放入 本地缓存 其他地反可以删除 循环
    this.aniIntervals.push(setInterval(() => {
      obj.currentFrame += 1
      // 当该类型精灵 循环完后 重复 循环
      if (obj.currentFrame >= obj.frames.length) obj.currentFrame = 0
      const frame = obj.frames[obj.currentFrame]
      obj._texture = PIXI.utils.TextureCache[frame]
    }, 1000 / frameRate))
  }

  /**
   * 挂载在时间轴上的动画
   * @param {*} obj 要改变的对象
   * @param {*} duration 动画持续时间
   * @param {*} delay 动画延迟时间
   * @param {*} from 动画的起始参数 和 一些特殊的控制参数（TweenMax 中的参数）
   * @param {*} to 动画的结束参数 和 一些特殊的控制参数（TweenMax 中的参数）
   */
  onTimeline (obj, duration, delay, from, to) {
    let action
    if (from && to) {
      action = TweenMax.fromTo(obj, duration, from, to)
    } else if (to) {
      action = TweenMax.to(obj, duration, to)
    } else if (from) {
      action = TweenMax.from(obj, duration, from)
    }
    // 创建时间轴动画
    const timeline = new TimelineMax({ delay })
    // 加入动画 从第0秒开始
    timeline.add(action, 0)
    // 开始运行
    timeline.play()
    // repeat === -1 表示重复动画 不放入主时间轴中
    if (!(to && to.repeat === -1)) {
      // 将时间轴动画 加入主轴 从第0秒开始
      this.timeline.add(timeline, 0)
    }
  }

  // 事件相关 ────────────────────────────────────────────────────────────────────────────────
  /**
   * 添加自定义事件
   * @param {*} name 事件名称
   * @param {*} callback 回调函数
   */
  on (name, callback) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(callback)
  }

  /**
   * 删除自定义事件
   * @param {*} name 事件名称
   * @param {*} callback 回调函数 必须 是 添加时的函数
   */
  off (name, callback) {
    const callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
      const index = callbacks.indexOf(callback)
      if (index !== -1) callbacks.splice(index, 1)
    }
  }

  /**
   * 执行自定义函数
   * @param {*} name 事件名称
   * @param {*} params 传入回调函数中的参数
   */
  trigger (name, params) {
    const callbacks = this.callbacks[name]
    if (callbacks && callbacks instanceof Array) {
      // 执行 所有的 函数
      callbacks.forEach((cb) => {
        cb(params)
      })
    }
  }
  

  // pixi精灵的 通用属性设置 ────────────────────────────────────────────────────────────────────────────────
  /**
   * 设置尺寸
   * @param {*} obj PIXI.Sprite 对象
   * @param { mode: "", width: "", height:""} size 设置对象
   * mode ： 类型  
   * width ： 有类型 为比例  -- 无类型 自定义宽度
   * height ： 有类型 为比例  -- 无类型 自定义高度
   */
  setSize (obj, size) {
    if (size.mode === 'widthFit') { // 按宽度适应 比例
      const scale = this.app.screen.width * size.width / obj.width
      obj.scale.x = scale
      obj.scale.y = scale
    } else if (size.mode === 'heightFit') { // 按高度适应 比例
      const scale = this.app.screen.height * size.height / obj.height
      obj.scale.x = scale
      obj.scale.y = scale
    } else { // mode为空 自定义 宽高
      obj.width = size.width
      obj.height = size.height
    }
  }
  
  /**
   * 设置锚点 位置
   * @param {*} obj PIXI.Sprite 对象
   * @param {*} anchor 字符串 -- 从类型中库中获取比例
   * 对象 -- 自定义 x,y 的比例
   */
  setAnchor (obj, anchor) {
    if (typeof anchor === 'string') {
      // 根据类型 获取比例
      const anchorMap = this.positionMap(anchor)
      obj.anchor.x = anchorMap.x
      obj.anchor.y = anchorMap.y
    } else {
      // 自定义比例
      obj.anchor.x = anchor.x
      obj.anchor.y = anchor.y
    }
  }

  /**
   * 设置位置 精灵在画布上对应的位置
   * @param {*} obj PIXI.Sprite 对象
   * @param {*} position 字符串 -- 从类型中库中获取比例
   * 对象 -- 自定义 x,y 的比例
   */
  setPosition (obj, position) {
    if (typeof position === 'string') {
      // 根据类型 获取比例
      position = this.positionMap(position)
    }
    // 根据比例 计算 页面位置
    obj.position.x = position.x * this.app.screen.width
    obj.position.y = position.y * this.app.screen.height
  }

  /**
   * 根据类型 获取比例 --通过比例计算位置
   * 比例库
   * @param {*} type 
   */
  positionMap (type) {
    const map = {
      top: { x: 0.5, y: 0 },
      right: { x: 1, y: 0.5 },
      bottom: { x: 0.5, y: 1 },
      left: { x: 0, y: 0.5 },
      topLeft: { x: 0, y: 0 },
      topRight: { x: 1, y: 0 },
      bottomLeft: { x: 0, y: 1 },
      bottomRight: { x: 1, y: 1 },
      center: { x: 0.5, y: 0.5 }
    }
    return map[type] || { x: 0, y: 0 }
  }
}

export default Index;
