// 创建 场景
var scene = new THREE.Scene()

// 创建网格模型
// //创建一个立方体几何对象Geometry
// var geometry = new THREE.BoxGeometry(100, 100, 100);

var geometry = new THREE.BoxGeometry(100, 100, 100) //创建一个立方体几何对象Geometry

// 材质
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide //两面可见
})
var mesh = new THREE.Mesh(geometry, material)
console.log(mesh.geometry)
scene.add(mesh) // 网格模型添加到场景中

// 点渲染模式
// var material = new THREE.PointsMaterial({
//   color: 0xff0000,
//   size: 5.0 //点对象像素尺寸
// }); //材质对象
// var points = new THREE.Points(geometry, material); //点模型对象
// scene.add(points); //点对象添加到场景中

// 线条渲染模式
// var material = new THREE.LineBasicMaterial({
//   color: 0xff0000 //线条颜色
// }); //材质对象
// // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// var line = new THREE.Line(geometry, material); //线条模型对象
// scene.add(line);

// 头部网格模型和组
var headMesh = sphereMesh(10, 0, 0, 0)
headMesh.name = '脑壳'
var leftEyeMesh = sphereMesh(1, 8, 5, 4)
leftEyeMesh.name = '左眼'
var rightEyeMesh = sphereMesh(1, 8, 5, -4)
rightEyeMesh.name = '右眼'
var headGroup = new THREE.Group()
headGroup.name = '头部'
headGroup.add(headMesh, leftEyeMesh, rightEyeMesh)
// 身体网格模型和组
var neckMesh = cylinderMesh(3, 10, 0, -15, 0)
neckMesh.name = '脖子'
var bodyMesh = cylinderMesh(14, 30, 0, -35, 0)
bodyMesh.name = '腹部'
var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7)
leftLegMesh.name = '左腿'
var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7)
rightLegMesh.name = '右腿'
var legGroup = new THREE.Group()
legGroup.name = '腿'
legGroup.add(leftLegMesh, rightLegMesh)
var bodyGroup = new THREE.Group()
bodyGroup.name = '身体'
bodyGroup.add(neckMesh, bodyMesh, legGroup)
// 人Group
var personGroup = new THREE.Group()
personGroup.name = '人'
personGroup.add(headGroup, bodyGroup)
personGroup.translateY(50)
scene.add(personGroup)

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
  var geometry = new THREE.SphereGeometry(R, 25, 25) //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) //材质对象Material
  var mesh = new THREE.Mesh(geometry, material) // 创建网格模型对象
  mesh.position.set(x, y, z)
  return mesh
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
  var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25) //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) //材质对象Material
  var mesh = new THREE.Mesh(geometry, material) // 创建网格模型对象
  mesh.position.set(x, y, z)
  return mesh
}

// 光源设置
// 点光源
var point = new THREE.PointLight(0xffffff)
point.position.set(400, 200, 300) // 点光源位置
scene.add(point) // 点光源添加到场景中

// 环境光
var ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)
// console.log(scene)
// console.log(scene.children)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比
var s = 100 //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 100, 100) // 设置相机位置
camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer()
renderer.setSize(500, 500) // 设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
document.body.appendChild(renderer.domElement) // body元素中插入canvas对象
// 执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

function render() {
  renderer.render(scene, camera) //执行渲染操作
}
render()
var controls = new THREE.OrbitControls(camera, renderer.domElement) //创建控件对象
controls.addEventListener('change', render) //监听鼠标、键盘事件

// scene.traverse(function (obj) {
//   // 打印id属性
//   console.log("id==", obj);
//   // 打印该对象的父对象
//   // console.log("parent==", obj.parent);
//   // // 打印该对象的子对象
//   // console.log("children==", obj.children);
//   if ((obj.name === "左眼") | (obj.name === "右眼")) {
//     obj.material.color.set(0x000000);
//   }
// });

var nameNode = scene.getObjectByName('左腿')
nameNode.material.color.set(0xff0000)
