// 创建 场景
var scene = new THREE.Scene();

// 加载雨滴理贴图
var textureTree = new THREE.TextureLoader().load("rain.png");

var group = new THREE.Group();
for (let i = 0; i < 400; i++) {
  var spriteMaterial = new THREE.SpriteMaterial({
    map: textureTree //设置精灵纹理贴图
  });
  // 创建精灵模型对象
  var sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);

  // 控制精灵大小,
  sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
  var k1 = Math.random() - 0.5;
  var k2 = Math.random() - 0.5;
  var k3 = Math.random() - 0.5;
  // 设置精灵模型位置，在整个空间上上随机分布
  // sprite.position.set(200 * k1, 200 * k3, 200 * k2);
  sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2);
}

scene.add(group);

// 光源设置
// 点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 200, 300); // 点光源位置
scene.add(point); // 点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

//创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(0, 100, 50); // 设置相机位置
// camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(292, 109, 268); //设置相机位置

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500); // 设置渲染区域尺寸
renderer.setClearColor(0x000000, 1); // 设置背景颜色
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
// 执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

function render() {
  group.children.forEach((sprite) => {
    // 雨滴的y坐标每次减1
    sprite.position.y -= 1;
    if (sprite.position.y < 0) {
      // 如果雨滴落到地面，重置y，从新下落
      sprite.position.y = 200;
    }
  });

  renderer.render(scene, camera); // 执行渲染操作

  requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
}

render();

var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
