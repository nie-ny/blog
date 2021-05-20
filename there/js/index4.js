// 创建 场景
var scene = new THREE.Scene();

var texture = new THREE.TextureLoader().load("sky.JPG");
// 创建精灵材质对象SpriteMaterial
var spriteMaterial = new THREE.SpriteMaterial({
  color: 0xff00ff, //设置精灵矩形区域颜色
  rotation: Math.PI / 2, //旋转精灵对象45度，弧度值
  map: texture //设置精灵纹理贴图
});
// 创建精灵模型对象，不需要几何体geometry参数
var sprite = new THREE.Sprite(spriteMaterial);

scene.add(sprite);

// 控制精灵大小，比如可视化中精灵大小表征数据大小
sprite.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以

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
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大

//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
camera.position.set(0, 100, 50); // 设置相机位置
camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500); // 设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
// 执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

function render() {
  renderer.render(scene, camera); //执行渲染操作
}

render();

var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
